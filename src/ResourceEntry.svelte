<script lang="ts">
    import type Resource from "types/resource";

    export let resource: Resource;
</script>

<div class="elc-box {`status-${resource.status}`}">
    <p>URL: {resource.url}</p>
    <p>Status: {resource.status}</p>
    <p>Kind: {resource.kind}</p>
</div>

<style>
    .status-broken {
        color: red;
    }
    .status-healthy {
        color: green;
    }
</style>
