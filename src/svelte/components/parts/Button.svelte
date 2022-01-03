<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher()
    const click = () => dispatch('click')

    import {button} from '../../styles/csses'
</script>

<button on:click={click} style={button}><slot /></button>
