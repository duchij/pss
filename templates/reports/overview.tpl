<table class="responsive" data-max="15">
<tr>
    <th><h2>Spravené</h2></th><th><h2>Úloha</h2></th><th><h2>Má sa spraviť</h2></th>
{foreach from=$data key=k item=row}
<tr>
    <td class="overInfo" style="color:red;">{$row.done}</td>
    <td class="overInfo">{$row.nazov}</td>
    <td class="overInfo" style="color:blue;">{$row.toDone-$row.done}</td>
</tr>
{/foreach}
</table>