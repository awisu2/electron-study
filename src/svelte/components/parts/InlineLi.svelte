<script>
    import {contentMargin} from '../../styles/args'

    const styels = {
        li: `
            display: inline;
            margin-right: ${contentMargin.small};
        `
    }
</script>

<li style="{styels.li}"><slot /></li>