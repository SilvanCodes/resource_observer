<script lang="ts">
    import { onMount } from "svelte";
    import type Observation from "types/observation";
    import type Resource from "types/resource";
    import { GET } from "./api";
    import ResourceEntry from "./ResourceEntry.svelte";
    import { l } from "./utility";

    const possibleResourceStatus = ["a", "b"];
    let getObservedResources: Promise<{ results: Resource[] }>;
    let observedResources: Observation & { results: Resource[] };

    let filteredObservedResources: Resource[];

    let observationDomainInput: HTMLInputElement;
    let observationDomainInputValue: string;

    let observedResourcesUrl = "";

    const startObservation = () =>
        observationDomainInputValue &&
        (l("startObservation caled"),
        GET(`/${observationDomainInputValue}/start`).then(
            ({ id, root }: Observation) => (
                (observedResourcesUrl = `/${root.replace(
                    "https://",
                    ""
                )}/${id}`),
                l(observedResourcesUrl),
                observedResourcesUrl
            )
        ));

    onMount(() => {
        const interval = setInterval(
            async () =>
                observedResourcesUrl &&
                (observedResources = await GET(observedResourcesUrl)),
            1000 * 3
        );

        return () => {
            clearInterval(interval);
        };
    });
</script>

<main class="elc-center elc-stack">
    <h1>Resource Observer</h1>
    <form on:submit|preventDefault={startObservation}>
        <label for="observation-domain">Observation Domain</label>

        <input
            name="observation-domain"
            id="observation-domain"
            bind:this={observationDomainInput}
            bind:value={observationDomainInputValue}
            type="text"
            placeholder="your.domain"
        />

        <button class="secondary">
            <i class="mi-send display:inline-block transform:rotateZ:90" />
        </button>
    </form>

    <p>
        The resource observer starts from the index.html and checks all internal
        and external resources for status code 2xx. Other status codes are
        reported as broken. The observation takes place at a rate of 60
        resources per minute. I.e. it may take up to one minute to see the first
        results. The observation is limited to 1000 resources in total.
    </p>

    <!-- <label for="resource-status">Resource Status</label>
    <select name="resource-status" id="resource-status" on:change={l}>
        {#each possibleResourceStatus as resourceStatus}
            <option value={resourceStatus}>{resourceStatus}</option>
        {/each}
    </select> -->

    {#if observedResources}
        <div>
            <p>Status: {observedResources.status}</p>
        </div>

        <ul class="elc-stack">
            {#each observedResources.results as resource}
                <li><ResourceEntry {resource} /></li>
            {/each}
        </ul>
    {:else}
        <p>Enter domain to observe.</p>
    {/if}
</main>
