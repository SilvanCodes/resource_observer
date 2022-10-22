# WhatMeal

> Started from `npx create-snowpack-app whatmeal --template @snowpack/app-template-svelte-typescript`

Super duper cool with [Dark] and [Snowpack] and [Svelte].

[Dark]: https://darklang.com
[Snowpack]: https://www.snowpack.dev
[Svelte]: https://svelte.dev

## Pitfalls sofar

Had to use `import.meta.env.` ([which I stumbled upon here]) instead of `__SNOWPACK_ENV__` as described [in the docs].
No clue why it fails, maybe due to Typescript?

[which I stumbled upon here]: https://bhirmbani.medium.com/managing-multiple-environment-in-snowpack-18ba46ed78b
[in the docs]: https://www.snowpack.dev/reference/environment-variables

## Quirks

See `package.json` and `index.html` which had to be ajusted for a variable root directory configured via `SNOWPACK_PUBLIC_BASE_URL` in `.env` [due to this].

[due to this]: https://docs.darklang.com/static-assets/#configure-your-client