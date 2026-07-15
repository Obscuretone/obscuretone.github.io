---
title: The XKCD Tasks Meme As A Systems Test
image: rt_xkcd_tasks_bird_park.webp
imagealt: "An uploaded photo splits into an EXIF GPS park-boundary check and a bird vision classifier before merging into an API response."
imagecaption: "The classic bird-in-a-national-park task broken into metadata, geography, vision, and API glue."
imagesource: "AI-generated illustration created for obscuretone with OpenAI image generation."
description: A project note on implementing the classic XKCD Tasks problem with EXIF parsing, geospatial boundaries, and computer vision classification.
tags: [ai, computer-vision, geospatial, software, systems]
---

[xkcdmeme](https://github.com/obscuretone/xkcdmeme) is an implementation of the classic [XKCD "Tasks" joke](https://xkcd.com/1425/): given a photo, determine whether it was taken in a national park and whether it contains a bird.

The joke works because the two halves sound wildly different in difficulty. Checking a location feels straightforward. Identifying whether a photo contains a bird sounds like a research problem.

That contrast has changed.

Modern open-source geospatial tooling, image metadata libraries, and pre-trained vision models make the problem small enough to implement as a service. That does not make it trivial, but it does make it a good test of how much leverage current tooling gives a developer.

## The Problem

The service accepts an uploaded image and answers two questions:

1. Does the image contain a bird?
2. Was the image taken inside a U.S. National Park?

Those questions require different kinds of evidence.

The bird question is visual classification. The park question is geospatial validation. A useful answer needs to combine both.

## Geospatial Verification

For location, the service reads GPS metadata from the image's EXIF data. Camera GPS coordinates are commonly stored as degrees, minutes, and seconds, so the first step is parsing those into decimal latitude and longitude.

Then the service checks the coordinate against [National Park Service boundary data](https://www.nps.gov/subjects/science/science-data.htm) using geospatial libraries such as GeoPandas and Shapely. GeoPandas' own spatial-join docs describe this exact class of operation: combining point and polygon data based on [their spatial relationship](https://geopandas.org/en/stable/gallery/spatial_joins.html).

That part of the problem is a good reminder that "simple" tasks still require careful data handling:

1. Not every image has GPS metadata.
2. EXIF coordinates need parsing and normalization.
3. Boundary data needs to be loaded and queried efficiently.
4. The result needs to distinguish "not in a park" from "no usable location data."

Those distinctions matter in an API because callers need to know whether the answer is negative or unknowable.

## Image Classification

For the bird check, the service uses a pre-trained Vision Transformer through [Hugging Face image-classification tooling](https://huggingface.co/docs/transformers/tasks/image_classification).

This is where the XKCD joke has aged in an interesting way. Building a reliable image classifier from scratch is still serious work. But using a pre-trained model to answer a narrow classification question is now a practical integration task.

That shifts the engineering problem from "invent computer vision" to:

1. Choose a suitable model.
2. Preprocess images correctly.
3. Interpret model labels and confidence.
4. Decide thresholds.
5. Return clear results.
6. Test the failure modes.

The hard part did not disappear. It moved into model selection, integration, evaluation, and product boundaries.

## One API, Two Kinds Of Reasoning

The service exposes a single endpoint that combines both checks. A successful response includes whether the subject appears to be a bird, the classification confidence, whether the GPS coordinate is inside a park, and the park name when available.

That makes the project a useful miniature of modern applied AI work. The model is only one piece. The rest is ordinary software engineering: file handling, metadata extraction, geospatial joins, error handling, response design, and tests.

## What The Project Shows

The interesting lesson is that the boundary between research problem and integration problem keeps moving.

A task that once required specialized ML work may become accessible when the ecosystem provides:

1. pre-trained models
2. good data sources
3. mature libraries
4. fast local development tools
5. clear service boundaries

That is a real change in what small teams can build.

## Closing Thought

The XKCD Tasks meme is still funny because it captures something true: software difficulty is uneven and often surprising.

But it also shows how quickly the baseline changes. Once the right models and libraries exist, the challenge becomes less about inventing the capability and more about composing it responsibly into a useful system.
