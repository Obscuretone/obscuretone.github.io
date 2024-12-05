---
title: Politics Is Not Strongly Typed
description: Party labels look like clear types, but local politics is full of implicit conversions, overloaded names, and values that only make sense at runtime.
---

Politics is not strongly typed.

In the 2003 Nova Scotia provincial election in Argyle, the Progressive Conservative candidate was Chris d'Entremont: radio broadcaster, salesperson, economic development worker, and future provincial House Leader.

The Liberal candidate was Aldric Benoit d'Entremont: municipal warden, car salesman, and [Knights of Columbus member](https://www.facebook.com/groups/776463725773379/posts/25773713458955060/).

There were [5,845 names on the official list](https://web.archive.org/web/20241105025356/https://electionsnovascotia.ca/sites/default/files/03dist03.pdf). A total of 4,918 electors voted.

If you are used to politics as television, you see two parties.

If you are from there, you see two d'Entremonts.

The Dictionary of Canadian Biography identifies Philippe Mius d'Entremont as the first [Baron de Pobomcoup](https://www.biographi.ca/en/bio/mius_d_entremont_philippe_1E.html), notes that the barony remained in the family until the Acadian expulsion, and says he left a large number of descendants in Acadia. Nova Scotia Archives dates the grant of Pobomcoup as a barony to [July 17, 1653](https://archives.novascotia.ca/communityalbums/pubnico/archives/?ID=928).

So the ballot was not merely Liberal versus Progressive Conservative.

At local resolution, it was also two candidates carrying a name tied back to a 1653 French colonial barony, running for modern party labels in a riding with fewer than six thousand listed electors.

This was not an accident in the ordinary sense. Argyle became its own provincial riding in 1981 because Yarmouth was split and the Municipality of Argyle received separate representation. Later, Argyle became one of Nova Scotia's protected Acadian ridings: an exception to ordinary voter-parity rules meant to preserve effective representation for Acadian communities.

The system was not designed to preserve a barony. But in Argyle, preserving Acadian political representation also means preserving a political surface where names like d'Entremont, LeBlanc, Surette, Muise, and d'Eon still carry real local information.

That is the joke hiding inside the design.

Everything else is just explaining why that sentence breaks more political analysis than it should.

Politics pretends to be strongly typed.

The interface says Liberal, Conservative, New Democrat, Green, independent, left, right, progressive, moderate, populist, establishment, urban, rural, federal, provincial, local.

Those labels look like types.

They are not.

They are hints.

Sometimes they are useful hints. Sometimes they are stale comments. Sometimes they are marketing. Sometimes they are the only field the database preserved after throwing away the interesting data.

This is why national politics discourse often loses precision the moment it touches a small place.

It assumes the label is the object.

It is not.

## Argyle 2003

Those were not random names on a ballot.

An archived Nova Scotia PC caucus profile says Chris worked as a [broadcaster, salesperson, and economic development officer](https://web.archive.org/web/20131029214036/http://www.pccaucus.ns.ca/node/3545). In November 2003, the Province of Nova Scotia quoted Aldric as [warden of the Municipality of the District of Argyle](https://news.novascotia.ca/en/2003/11/28/infrastructure-funding-project-tusket). Canadian Blood Services later described him as a former warden and quoted him joking about being a former ["honest used car salesman and politician"](https://www.blood.ca/en/stories/i-feel-so-good-after-donating-blood).

Argyle, Nova Scotia is a useful test case because it is small enough for abstraction to fail visibly.

The parties mattered. They organized campaigns, carried history, connected the riding to provincial power, and gave voters a recognizable ballot structure.

But the party labels were not the whole type.

They were one field in a record with many fields.

Name.

Family.

Church.

Village.

Language.

Reputation.

Work history.

Who helped whom.

Who showed up.

Who was trusted to answer the phone.

Who had been around long enough that people could imagine them doing the job.

The ballot compressed all of that into party, candidate, and an X.

That compression is useful.

It is also lossy.

## The Type Error

In a strongly typed system, a value has a type and the compiler enforces what can be done with it.

An integer is not a string. A boolean is not a date. A `UserId` is not an `EmailAddress`. If you try to pass the wrong thing into the wrong function, the system complains before production.

Politics does not work that way.

Politics is closer to a dynamically typed system full of runtime coercion.

A Liberal in one place is not necessarily compatible with a Liberal somewhere else. A Conservative in a fishing village, a Calgary suburb, an Ontario university town, and a federal leadership race may share a party label while carrying very different assumptions about church, labour, language, family, taxation, housing, guns, unions, immigration, patronage, and which cousin owes whom a favour.

The compiler does not catch that.

There is no compiler.

There is only an election.

Then everyone reads the result as if the types were real.

## The Liberal Was Not A Generic Type

The Liberal in that race was also a municipal warden, a car salesman, and a member of the Knights of Columbus.

That matters because the Knights are not exactly a generic socially liberal institution. The organization describes its own "culture of life" work as defending human life ["from conception to natural death"](https://www.kofc.org/what-we-do/charity/culture-of-life/), and highlights its work with March for Life events, pregnancy centres, and ultrasound programs.

You do not need to agree with any of that to understand the type error.

If someone reads "Liberal candidate" and imports the entire modern national Liberal schema, they have already lost information.

The local value does not conform cleanly to the expected type.

It is not because the data is corrupt.

It is because the type is too simple.

The same word means different things at different levels of government, in different regions, across different eras, and inside different communities.

A small-town Liberal can be culturally conservative. A Conservative can be economically localist. A federal partisan can become a provincial pragmatist. A church network can matter more than a platform plank. A family name can carry more signal than a campaign sign.

If your model cannot represent that, the model is wrong.

## The Conservative Became A Liberal

The type error gets funnier.

Chris d'Entremont won that 2003 race as a Progressive Conservative MLA. He went on to represent Argyle and then Argyle-Barrington provincially for years. An archived Nova Scotia PC caucus profile listed him as [House Leader](https://web.archive.org/web/20131029214036/http://www.pccaucus.ns.ca/node/3545), which is even better for this argument than a normal backbench career: the local candidate became part of the legislature's control surface.

In 2019, Global described him as a [longtime Nova Scotia PC MLA who had won the federal Conservative nomination in West Nova](https://globalnews.ca/news/5422711/dentremont-wins-tory-nomination/).

He won federally as a Conservative.

He represented West Nova, then the redesigned federal riding of Acadie-Annapolis. He served as [Deputy Speaker of the House of Commons](https://www.ourcommons.ca/members/en/chris-dentremont%2849344%29/roles).

And now, according to his official House of Commons profile, [Chris d'Entremont is a Liberal MP](https://www.ourcommons.ca/members/en/chris-dentremont%2849344%29).

If party labels were strong types, this would look like a type violation.

It is not.

It is a runtime conversion.

The person did not become a different object. The label changed. The institutional context changed. The federal party system changed. The incentives changed. The coalition around him changed. The voters now have to interpret what the label means after the fact.

That is politics.

The program keeps running.

## Labels Are Interfaces

A party label is an interface.

It says, roughly:

This candidate belongs to this team.

This team will probably behave this way.

This vote will probably aggregate into that caucus, premier, prime minister, cabinet, opposition, committee, or whip structure.

That is useful information.

But an interface is not an implementation.

The implementation includes local candidate quality, constituency work, political inheritance, family networks, ethnic and language communities, religious institutions, old grudges, regional economic interests, and whether people believe the candidate will remember where the wharf is without needing staff to brief them.

National media mostly sees the interface.

Local voters often see the implementation.

That is why a national map can look cleaner than the politics underneath it. The map colours every riding as if each winner is a pure instance of a party class. Then everyone explains the country from the colours.

Red means this.

Blue means that.

Orange means this other thing.

Maybe.

Sometimes.

At one resolution.

Zoom in far enough and the types blur.

## This Is Not A Plea For Vibes

None of this means politics is only personal.

Platforms matter. Parties matter. Whips matter. Cabinets matter. Courts, laws, budgets, unions, corporations, churches, lobbyists, and media ecosystems matter.

The label is not meaningless.

The mistake is treating it as complete.

Software engineers know this problem. A type can tell you what operations are allowed, but it cannot tell you all the semantic meaning of a value. A `string` can contain a password, a postal code, a name, a SQL query, a poem, or a lie. The type is true and still insufficient.

Party labels work like that.

They constrain behaviour.

They do not fully describe it.

They are especially bad at describing places where politics is personal, historical, and small enough that everyone remembers things the official record never stored.

## The Better Model

A better model treats party as one field, not the whole record.

For a candidate, the record might include:

1. party
2. level of government
3. riding
4. local history
5. personal reputation
6. institutional networks
7. ideological commitments
8. caucus incentives
9. leadership constraints
10. what voters think the label means here

That last field matters.

Politics is not just what the party says it is. It is what voters, organizers, institutions, and opponents understand the label to mean in that place at that time.

Argyle 2003 makes that obvious because the national abstraction collapses almost immediately.

The Liberal was not a generic national Liberal.

The Conservative eventually became a Liberal MP.

The riding was tiny.

The names mattered.

The churches mattered.

The parties mattered too.

All of those statements can be true at once.

That is the part our political vocabulary handles badly.

It wants one type.

Reality gives it an object graph.
