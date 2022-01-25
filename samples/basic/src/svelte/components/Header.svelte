<script>
    import {Nav} from './'
   	import { sectionMargin, contentPadding, contentMargin, textColors, backgroundColors } from '../styles/args';

	const styles = {
		header: `
			background: ${backgroundColors.hililght};
			padding: ${contentPadding.normal};
			margin-bottom: ${sectionMargin.normal};
		`,
		h1: `
            display: inline;
            color: ${textColors.onHilight};
            margin-right: ${contentMargin.normal};
        `,
		main: `
			padding: ${contentPadding.normal};
		`
	}
</script>

<header style={styles.header}>
    <h1 style={styles.h1}>electron app</h1>
    <Nav />
</header>

