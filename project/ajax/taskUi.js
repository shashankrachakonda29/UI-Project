function getstask() {
    var _url = '/task/getstask';

    $.ajax({
        url: _url,
        type: "get",
        success: function (data) {
            for (var stask of data){
                var task=`

                    <tr>
                        <td><a href="/task1?keyid=${stask._id}">${stask.name}</a></td>
                        <td><a href="/task1?keyid=${stask._id}">${stask.type}</a></td>
                        <td><a href="/task1?keyid=${stask._id}">${stask.startDate}</a></td>
                        <td><a href="/task1?keyid=${stask._id}">${stask.endDate}</a></td>
                        <td><a href="/task1?keyid=${stask._id}">${stask.description}</a></td>
                        <td><a href="/task1?keyid=${stask._id}">${stask.owner}</a></td>
                    </tr>
                `
                $("tbody").append(task)
            }
        },
        error: function () {
            $(location).attr('href', '/')
        }
    });
}

// Bind data to Ui
function bindstask() {
    var id = getUrlVars()["keyid"]
    console.log(id)
    if (id) {
        $.ajax({
            url: 'task/getstaskdetails?keyid=' + id,
            type: "get",
            success: function (data) {
                $('#Name').val(data.name),
                $('#type').val(data.type),
                $('#sdate').val(data.startDate),
                $('#edate').val(data.endDate),
                $('#description').val(data.description),
                $('#owner').val(data.owner),
                $('#documentname').val(data.staskdocs.docname)
                data.staskdocs.forEach(function(el){
                    if(Array.isArray(el)){
                        el=el[0];
                    }
                    $("tbody").append('<tr><td class="docname">' + el.docname + '</td><td class="file"><a href="/task/viewodoc?docname=' + el.docpath + '" class="fildownad"><i class="fa fa-download"></i></a></td></tr>')
                })
            }
        });
    }

}
function getUrlVars() {
    var vars = [],
      hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }