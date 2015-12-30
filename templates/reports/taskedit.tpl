<div style="width:100%">
<table class="responsive" data-max="15">
<tr>
    <th>Názov</th>
    <th>Poznámka</th>
    <th>Akcia</th>

</tr>
</table>

<div id="listView">
<table class="responsive" data-max="15">

{foreach from=$data key=k item=row}
<tr>
    <td>{$row.name}</td>
    <td><p class="small">{$row.comment}</p></td>
    <td>
        <button onclick="editTask('{$row.id}');" class="green button">Edituj</button>
        <button onclick="deleteTask('{$row.id}');" class="red button">Zmaž</button>
     </td>
</tr>
{/foreach}
</table>
</div>

</div>