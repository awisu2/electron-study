<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher()
    const click = () => dispatch('click')

    export let isLine = true

    const styles = {
        span: `
            cursor: pointer;
            text-decoration: ${isLine ? "underline" : "none"};
        `
    }
</script>

<span style={styles.span} on:click={click}><slot /></span>