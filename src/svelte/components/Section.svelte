<script>
  /**
   * 特定のスタイルを持つだけのコンポーネント
   * 
   * styledの代わりとして
   */
  import {sectionMargin} from '../styleArgs'

  export let margin = sectionMargin.normal
</script>

<section style="margin-bottom: {margin}">
  <slot></slot>
</section>
