(() => {
    const banner = document.querySelector('[data-analytics-id]');
    const settings = document.querySelector('[data-analytics-open]');
    const id = banner?.dataset.analyticsId;
    if (!/^G-[A-Z0-9]+$/.test(id ?? '') || !settings) return;

    const key = 'analytics-consent';
    const disable = `ga-disable-${id}`;
    const controls = banner.querySelectorAll('[data-analytics-choice]');
    const deniedAds = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
    let tagStarted = false;
    let fromSettings = false;

    function gtag() {
        window.dataLayer.push(arguments);
    }

    function readChoice() {
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    }

    function setBanner(visible) {
        banner.hidden = !visible;
        settings.hidden = visible && !fromSettings;
    }

    function startTag() {
        tagStarted = true;
        window.dataLayer = window.dataLayer || [];
        const pageLocation = location.origin + location.pathname;
        const referrer = document.referrer ? new URL(document.referrer) : null;
        const pageReferrer = referrer && /^https?:$/.test(referrer.protocol) ? referrer.origin : '';

        gtag('consent', 'default', { analytics_storage: 'granted', ...deniedAds });
        gtag('js', new Date());
        gtag('config', id, {
            send_page_view: false,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            cookie_domain: location.hostname,
            page_location: pageLocation,
            page_referrer: pageReferrer,
        });
        let lastPage;
        function trackPage() {
            const nextPage = location.origin + location.pathname;
            if (window[disable] || nextPage === lastPage) return;
            gtag('event', 'page_view', {
                send_to: id,
                page_location: nextPage,
                page_referrer: lastPage || pageReferrer,
                page_title: document.title,
            });
            lastPage = nextPage;
        }
        trackPage();
        window.addEventListener('analytics-page-change', trackPage);

        const tag = document.createElement('script');
        tag.async = true;
        tag.referrerPolicy = 'origin';
        tag.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
        document.head.append(tag);
    }

    function apply(choice) {
        const allowed = choice === 'granted';
        window[disable] = !allowed;
        for (const control of controls) {
            control.setAttribute('aria-pressed', String(control.dataset.analyticsChoice === choice));
        }
        if (allowed && !tagStarted) startTag();
        else if (tagStarted) {
            gtag('consent', 'update', { analytics_storage: allowed ? 'granted' : 'denied', ...deniedAds });
            if (!allowed) {
                for (const name of ['_ga', `_ga_${id.slice(2)}`]) {
                    const expired = `${name}=; Max-Age=0; Path=/; Secure; SameSite=Lax`;
                    document.cookie = expired;
                    document.cookie = `${expired}; Domain=${location.hostname}`;
                }
            }
        }
        setBanner(choice !== 'granted' && choice !== 'denied');
    }

    function reserveSpace() {
        document.documentElement.style.setProperty(
            '--analytics-footer-height', `${Math.ceil(banner.getBoundingClientRect().height)}px`,
        );
    }

    for (const control of controls) {
        control.addEventListener('click', () => {
            const choice = control.dataset.analyticsChoice;
            try {
                localStorage.setItem(key, choice);
            } catch {
                // The choice still applies to the current page if browser storage is unavailable.
            }
            apply(choice);
            if (fromSettings) settings.focus({ preventScroll: true });
            fromSettings = false;
        });
    }
    settings.addEventListener('click', () => {
        fromSettings = true;
        setBanner(true);
        controls[0]?.focus({ preventScroll: true });
    });
    window.addEventListener('storage', event => {
        if (event.key === key || event.key === null) {
            fromSettings = false;
            apply(readChoice());
        }
    });

    if (typeof ResizeObserver === 'function') new ResizeObserver(reserveSpace).observe(banner);
    else window.addEventListener('resize', reserveSpace);
    apply(readChoice());
    reserveSpace();
})();
