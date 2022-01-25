<script>
  const texts = [
    {id: 1, text: "<b>with html</b>"},
    {id: 2, text: "no html tag"},
  ]

  let selected = texts[0]

  let text = selected.text
  let isHtml = true

</script>


<div>
  <textarea bind:value={text}></textarea>
</div>

<!-- selectに値をbind: https://svelte.dev/tutorial/select-bindings-->
<div>
  chage from preset: <select bind:value={selected} on:change={() => {text = selected.text}}>
    {#each texts as t (t.id)}
      <option value={t}>{t.text}</option>
    {/each}
  </select>
</div>

<div>
  <!-- checkboxにbinding: https://svelte.dev/tutorial/checkbox-inputs -->
  <input type=checkbox bind:checked={isHtml} /> ishtml
</div>

{#if isHtml}
  <p>{@html text}</p>
{:else}
  <p>{text}</p>
{/if}
