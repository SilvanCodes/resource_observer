const l = console.log;

// see here: https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7
const clickOutside = (node: Node) => {
    const handleClick = (event: Event) => {
        node && !node.contains(event.target as Node) && !event.defaultPrevented && node.dispatchEvent(new CustomEvent('clickoutside', {}))
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}

export { l, clickOutside };