$(document).ready(function() {

    var table = $('#comic_list').DataTable({
        "processing": true,
        "stateSave": true,
        "serverSide": true,
        "ajax": {
            "type": "POST",
            "url": "/comic/recent/json/",
            "data": function ( d ) {
                d.csrfmiddlewaretoken = $("input[name='csrfmiddlewaretoken']")[0].value;
            },
        },
        "rowCallback": function( row, data, index ) {
            var r = $(row);
            var cols = $('td:nth-child(n+2)', row);
            cols.attr('data-href', data['url']);
            cols.attr('style', 'cursor: pointer;');
            cols.click(function() {
                window.document.location = $(this).data("href");
            });
            var tds = $('td:eq(0)', row);
            tds.html('<input type="checkbox" name="selected" value="'+data['selector']+'" data-type="'+data['type']+'"/>');
            var cb = $('input', tds);
            cb.change(function() {
                $(this).closest('tr').toggleClass('info')
            });

        },
        "drawCallback": function( settings ) {
            var tds = $('table tr td:first-child');
            tds.click(function(event){
                if (!$(event.target).is('input')) {
                    var $cb = $('input', this);
                    $cb.click();
                }
            });
        },
        "columns": [
            { "data" : "selector", "orderable": false },
            { "data" : "icon", "orderable": false },
            { "data" : "name" },
            { "data" : "date" },
            { "data" : "label", "orderable": false },
        ],

        "order": [[ 3, 'desc' ]],
    });
    $(".clickable-row").click(function() {
        window.document.location = $(this).data("href");
    });
    $('#func_selector').on('change', function() {
        $.post('/comic/edit/', $('#comic_form').serialize())
        .done(function(){
            $('#func_selector').val('choose');
            $('#select-all input').prop('checked', false);
            table.ajax.reload();
        }).fail(function(){
            alert('Error Submitting Change');
        })

    });
    $('#select-all').click(function(event){
        var cb = $('input', this);
        if (!$(event.target).is('input')) {
            cb.click();
        }
        $('table tr td:first-child input').each(function(chkbx) {
            row = $(this);
            if (row.prop('checked') != cb.prop('checked')){
                row.click();
            }
        });
    });
} );