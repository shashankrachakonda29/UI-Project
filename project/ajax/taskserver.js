function createstaskdocument() {
  var docpath = 'task/' + $('.addocs').find('a').attr('href');
  console.log(docpath)
  var docname = $('#documentname').val();
  Createstask(docpath, docname);
}
function Createstask(docpath,docname) {
  debugger
  if (formvalidator()) {
    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/task/createstask';
    if (t) {
      _id = t;
      _url = "/task/updatestask";
    }
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        stask: {
          id:_id,
          name: $('#Name').val(),
          type: $('#type option:selected').val(),
          startdate:$('#sdate').val(),
          enddate:$('#edate').val(),
          description: $('#description').val(),
          owner:$('#owner option:selected').val(),
          docname:docname,
          docpath:docpath,

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else if(data=="OK") {
          $(location).attr('href', '/tasktable')
        }else{
          alert(data);
        }
      }
    });
    alert("record Inserted")
  }
}
// Delete task data
function deletestask() {
  debugger
  var _id = getUrlVars()["keyid"];
  var _url = '/task/deletestask';
  var result = confirm('Are you sure want to delete task')
  if (result) {
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        stask: {
          id: _id
        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/tasktable')
        }
      }
    });
  }

}
// create meeting
function Createmeeting() {
  debugger
  if (formvalidator()) {
    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartnersfinance/createmeeting';
    if($("#isrepeattime:checkbox:checked").val()==="on"){
      if($(".weekormonth option:selected").val()==="Weekly"){
        var selectedweekdays = [];
        $('.wdays:checkbox:checked').each(function () {
          selectedweekdays.push($(this).val());
        });

          var start = moment();
          var end = moment().add(daysBetween( new Date($('#date').val()),new Date($('.enddate').val())-parseInt(1)) , 'd');

          var selectedday = [];
          selectedweekdays.forEach(function(weeks,i){
          var tmp = start.clone().day(weeks);
          if( tmp.isAfter(start, 'd') ){     
            selectedday.push(tmp._d);
          }
          while( tmp.isBefore(end) ){
            tmp.add(7, 'days');
            selectedday.push(tmp.format());
          }
          selectedday.pop()
        })
      }else if($(".weekormonth option:selected").val()==="Monthly" && $('input[name=day]:checked', '.mothwise').val()==="1"){
      console.log("month")
        var selectedday=[];
        var result=[]
        var daysinmonth=[]
        var statrtdate=new Date($("#date").val())
        var enddat=new Date($(".enddate").val())

        var statrtmonth=new Date($("#date").val()).getMonth()
        var endmonth=new Date($(".enddate").val()).getMonth()
        var selectedweekm=parseInt($("#selectedweekm option:selected").val())
        var selectday=$("#selectedweekinday option:selected").val()

  if(new Date($("#date").val()).getFullYear()==new Date($(".enddate").val()).getFullYear()){
  for(i=statrtmonth;i<=endmonth;i++){
  // console.log(i)
    daysinmonth=[];
  var monday = moment().set("year",new Date($("#date").val()).getFullYear()).set('month',i).day(selectday);
  console.log(monday)
  if (monday.date() > 7) monday.add(7, 'd');
  var month = monday.month();
  while (month === monday.month()) {daysinmonth.push(monday.toString()) 
    monday.add(7, 'd');
  }
  //selectedday.push(daysinmonth[selectedweekm])
  if(selectedweekm===0){if(statrtdate<=new Date(daysinmonth[0]) && enddat>=new Date(daysinmonth[0])){selectedday.push(daysinmonth[0])}}else if(selectedweekm===1){ if(statrtdate<=new Date(daysinmonth[1]) && enddat>=new Date(daysinmonth[1])){selectedday.push(daysinmonth[1])}}else if(selectedweekm===2){if(statrtdate<=new Date(daysinmonth[2]) && enddat>=new Date(daysinmonth[2])){selectedday.push(daysinmonth[2])}}else if(selectedweekm===3){if(statrtdate<=new Date(daysinmonth[3]) && enddat>=new Date(daysinmonth[3])){selectedday.push(daysinmonth[3])}}else if(selectedweekm===4){if(statrtdate<=new Date(daysinmonth.pop()) && enddat>=new Date(daysinmonth.pop())){selectedday.push(daysinmonth.pop())}}

  }
  }else{
    for(i=statrtmonth;i<=11;i++){
      console.log(statrtmonth)
      daysinmonth=[];
    var monday = moment().set("year",new Date($("#date").val()).getFullYear()).set('month',i).day(selectday);
    if (monday.date() > 7) monday.add(7, 'd');
    var month = monday.month();
    while (month === monday.month()) {daysinmonth.push(monday.toString()) 
      monday.add(7, 'd');
    }
    //selectedday.push(daysinmonth[selectedweekm])
    if(selectedweekm===0){if(statrtdate<=new Date(daysinmonth[0]) && enddat>=new Date(daysinmonth[0])){selectedday.push(daysinmonth[0])}}else if(selectedweekm===1){ if(statrtdate<=new Date(daysinmonth[1]) && enddat>=new Date(daysinmonth[1])){selectedday.push(daysinmonth[1])}}else if(selectedweekm===2){if(statrtdate<=new Date(daysinmonth[2]) && enddat>=new Date(daysinmonth[2])){selectedday.push(daysinmonth[2])}}else if(selectedweekm===3){if(statrtdate<=new Date(daysinmonth[3]) && enddat>=new Date(daysinmonth[3])){selectedday.push(daysinmonth[3])}}else if(selectedweekm===4){if(statrtdate<=new Date(daysinmonth.pop()) && enddat>=new Date(daysinmonth.pop())){selectedday.push(daysinmonth.pop())}}
    
    }
    for(i=0;i<=endmonth;i++){
      // console.log(i)
      daysinmonth=[];
    var monday = moment().set("year",new Date($(".enddate").val()).getFullYear()).set('month',i).day(selectday);
    if (monday.date() > 7) monday.add(7, 'd');
    var month = monday.month();
    while (month === monday.month()) {daysinmonth.push(monday.toString()) 
      monday.add(7, 'd');
    }
    //selectedday.push(daysinmonth[selectedweekm])
    if(selectedweekm===0){if(statrtdate<=new Date(daysinmonth[0]) && enddat>=new Date(daysinmonth[0])){selectedday.push(daysinmonth[0])}}else if(selectedweekm===1){ if(statrtdate<=new Date(daysinmonth[1]) && enddat>=new Date(daysinmonth[1])){selectedday.push(daysinmonth[1])}}else if(selectedweekm===2){if(statrtdate<=new Date(daysinmonth[2]) && enddat>=new Date(daysinmonth[2])){selectedday.push(daysinmonth[2])}}else if(selectedweekm===3){if(statrtdate<=new Date(daysinmonth[3]) && enddat>=new Date(daysinmonth[3])){selectedday.push(daysinmonth[3])}}else if(selectedweekm===4){if(statrtdate<=new Date(daysinmonth.pop()) && enddat>=new Date(daysinmonth.pop())){selectedday.push(daysinmonth.pop())}}
    
    }
  }
      }else{
      // alert("hi")
      selectedday=[]
        var statrtdate=new Date($("#date").val())
  var enddat=new Date($(".enddate").val())

    var statrtmonth=new Date($("#date").val()).getMonth()
    var endmonth=new Date($(".enddate").val()).getMonth();
  // var year=new Date($(".enddate").val()).getFullYear();
    if(new Date($("#date").val()).getFullYear()==new Date($(".enddate").val()).getFullYear()){

    for(i=statrtmonth+1;i<=endmonth+1;i++){
      let dateformate=new Date(new Date($("#date").val()).getFullYear()+"-"+i+'-'+$(".mothwise #days option:selected").val())
    // console.log(dateformate)
      if(statrtdate<=dateformate && enddat>=dateformate){selectedday.push(dateformate)}
      
    }
    }else{
      for(i=statrtmonth+1;i<=12;i++){
        let dateformate=new Date(new Date($("#date").val()).getFullYear()+"-"+i+'-'+$(".mothwise #days option:selected").val())
      // console.log(dateformate)
        if(statrtdate<=dateformate && enddat>=dateformate){selectedday.push(dateformate)}
        
      }
      for(i=1;i<=endmonth+1;i++){
        let dateformate=new Date(new Date($(".enddate").val()).getFullYear()+"-"+i+'-'+$(".mothwise #days option:selected").val())
        //console.log(dateformate)
        if(statrtdate<=dateformate && enddat>=dateformate){selectedday.push(dateformate)}
        
      }
    }
      }
    }else{
      selectedday=$("#date").val()
    }
  //console.log(daysinmonth)
      if (t) {
        _id = t;
        _url = '/fbpartnersfinance/updatemeeting'
      }


      //console.log($('#attending option:selected').map(function(){return $(this).data("id")}).get().join())

      $.ajax({
        url: _url,
        type: "POST",
        data: JSON.stringify({
          meeting: {
            id: _id,
            name: $('#Name').val(),
            email: $('#email').val(),
            notes: $('#notes').val(),
            subject: $('#subject').val(),
            meetingtype: $('#meetingtype option:selected').text(),
            meetingtypeId: $('#meetingtype option:selected').val().split('|')[0],
            Attendes: $('#attending option:selected').toArray().map(item => item.text).join(),
            AttendesEmail:$('#attending option:selected').toArray().map(item => item.value).join(),
            // AttendesId: $('#attending option:selected').toArray().map(item => (item.value).split("|")[1]).join(),  
            //  AttendesId: $('#attending option:selected').toArray().map(item => $(item).data("id")).join(),  
            AttendesId: $('#attending option:selected').toArray().map(item => $(item).data("id")).join(),     
            Colorcode:$("#meetingtype").find(':selected').data("colorcode"),

            startdates:selectedday,
            isrepeattime:$("#isrepeattime:checkbox:checked").val(),
            enddate:new Date($(".enddate").val()),
            scheduleddate: $('#date').val(),
            starttime: $('#starttime').val(),
            endtime: $('#endtime').val(),
            summary: $('#summary').val(),
            Attendedfor: $('#Attendedfor').val(),
            dealer: $('#dealer option:selected').text(),
            dealerId: $('#dealer option:selected').val(),
            lead: $('#leadname option:selected').text(),
            leadname: $('#leadname option:selected').text(),

            leadId: $('#leadname option:selected').val().split('|')[1],
            contact: $('#Contact option:selected').text(),
            contactId: $('#Contact option:selected').val(),
            Assigned: $('#Assigned option:selected').text(),
            AssignedEmail: $('#Assigned option:selected').val().split('|')[0],
            AssignedId: $('#Assigned option:selected').val().split('|')[1],
            meetingownername:getCookie('dru5'),
            meetingowneremail:unescape(getCookie('dru4')),
            status:1
          }
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

          if (data == 'failed') {
            alert('contact Admin')
          } else {
            $(location).attr('href', '/mymeeting')
          }
        }
      });
 }else{
   alert("am in")
 }
}

function getchecklist() {
  var checklist = [];

  $.each($("input[name='checklist']"), function () {
    var jsonData = {};
    jsonData.id = guidGenerator()
    jsonData.name = $(this).val()
    jsonData.ischecked = $(this).is(":checked") ? 1 : 0
    jsonData.checkeddate = $(this).is(":checked") ? Date.now() : ''

    checklist.push(jsonData)

  });

  return checklist;

}

function updatemeeting() {
  if (formvalidator()) {

    var t = getUrlVars()["keyid"];
    var _id = guidGenerator();
    var _url = '/fbpartnersfinance/updatemeeting';

    if (t) {
      _id = t;
      _url = '/fbpartnersfinance/updatemeeting'
    }

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        meeting: {
          id: _id,

          name: $('#Name').val(),
          email: $('#email').val(),

          meetingtype: $('#meetingtype').val(),
          scheduleddate: $('#date').val(),
          Attendedfor: $('#Attendedfor option:selected').text(),
          dealer: $('#dealer option:selected').text(),
          dealerId: $('#dealer option:selected').val(),
          lead: $('#leadname option:selected').text(),
          leadid: $('#leadname option:selected').val().split('|')[1],
          summary: $('#summary').val(),
          Assigned: $('#Assigned option:selected').text(),
          AssignedEmail: $('#Assigned option:selected').val().split('|')[0],
          AssignedId: $('#Assigned option:selected').val().split('|')[1],
          checklist: getchecklist(),




        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {

        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/mymeeting')
        }
      }
    });
  }
}

function createmeetingdocument() {
  var t= getUrlVars()["keyid"];
  var docpath = 'meeting/' + $('.addocs').find('a').attr('href');
  var docname = $('#documentname').val();
  // updatemymeeting(docpath, docname);
  
  $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "/fbpartnersfinance/updatemymeetingdocument",
    data: JSON.stringify({
      mymeeting: {
        id: t,
        docpath: docpath,
        docname: docname
      }
    }),
    success: function (data) {
      if (data == 'failed') {

      } else {
        $('.uploaddocs').empty();
        $('div.imgareas').empty().append('<span class="imgarea dz-clickable"><i class="fa fa-arrow-circle-o-up fa-2x"></i><br><p>Drop File(or)Click here</p></span>');
        $('#documentname').val('');
        $('#myModal').modal('hide');

        for (var d in data.docs) {
         
          var extns = data.docs[d].docpath.split('.').pop().toLowerCase();
          if (["csv", "xlsx", "doc", "docx", "ppt", "pptx", "txt", "odt"].includes(extns)) {
            $('.uploaddocs').append('<div class="docviw"><a href="/fbpartners/viewopdfdoc?docname=' + data.docs[d].docpath + '"target="_blank"   data-filename="' + data.docs[d].docpath + '" data-text="' + data.docs[d].docname + '" class="fildownad"><img src="static/images/fbpartners/' + extns + '.svg"></img></a> <div class="docoverlay"><a href="javascript:void(0)" class="icon" title="view"><i class="fa fa-eye-slash" aria-hidden="true"></i></a><a href="/fbpartners/viewodoc?docname=' + data.docs[d].docpath + '" target = "_blank" data-filename="' + data.docs[d].docpath + '" data-text="' + data.docs[d].docname + '" class="icon" title="Download"><i class="fa fa-download" aria-hidden="true"></i></a> </div></div>');
          } else {
            $('.uploaddocs').append('<div class="docviw"><a href="/fbpartners/viewopdfdoc?docname=' + data.docs[d].docpath + '"target="_blank"   data-filename="' + data.docs[d].docpath + '" data-text="' + data.docs[d].docname + '" class="fildownad"><img src="static/images/fbpartners/' + extns + '.svg"></img></a> <div class="docoverlay"><a href="/fbpartners/viewopdfdoc?docname=' + data.docs[d].docpath + '"target="_blank"   data-filename="' + data.docs[d].docpath + '" data-text="' + data.docs[d].docname + '" class="icon" title="view"><i class="fa fa-eye" aria-hidden="true"></i></a><a href="/fbpartners/viewodoc?docname=' + data.docs[d].docpath + '" target = "_blank" data-filename="' + data.docs[d].docpath + '" data-text="' + data.docs[d].docname + '" class="icon" title="Download"><i class="fa fa-download" aria-hidden="true"></i></a> </div></div>');
          }
         // $('.uploaddocs').append('<a href="/fbpartners/viewodoc?docname=' + data.docs[d].docpath + '" data-filename="' + data.docs[d].docpath + '" data-text="' + data.docs[d].docname + '" class="fildownad"><img src="static/images/fbpartners/' + extns + '.svg"></img><p class="pdfnames">'+data.docs[d].docname +'</p></a>');
        }
      }
    }
  });
}

function updatemymeeting(docpath, docname) {
  if (formvalidator()) {
  
    var ispostpone;
    _id = getUrlVars()["keyid"];
    var _url = '/fbpartnersfinance/updatemymeeting'   
   if($('#meetingstatus option:selected').text() === "Postpone" ){
    if (!$('#ispostpone').val()) {

       ispostpone =  $('#meetingstatus option:selected').text() === "Postpone" ? new Date() : '';
      
    } else {
       ispostpone =  $('#ispostpone').val() + '|' + new Date();
      
     
    }
  }
  else{
    
    ispostpone = $('#ispostpone').val()
  
  }

    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        meeting: {
          id: _id,
          notes: $('#notes').val(),
          subject:$("#subject").text(),
         // doctorname: $('#Name').val(),
         // doctoremail: $('#email').val(),
         // meetingtype: $('#meetingtype option:selected').text(),
          scheduleddate: $('#date').val(),
          starttime: $('#starttime').val(),
          endtime: $('#endtime').val(),
          summary: $('#summary').val(),
         // Attendedfor: $('#Attendedfor option:selected').text(),
         // dealer: $('#dealer option:selected').text(),
         // dealerId: $('#dealer option:selected').val(),
         // lead: $('#leadname option:selected').text(),
          meetingstatus: $('#meetingstatus option:selected').text(),
         // leadid: $('#leadname option:selected').val().split('|')[1],
         // Assigned: $('#Assigned option:selected').text(),
         // AssignedEmail: $('#Assigned option:selected').val().split('|')[0],
         // AssignedId: $('#Assigned option:selected').val().split('|')[1],
          ispostpone:ispostpone,
          closeddate: $('#meetingstatus option:selected').text() === "Closed" ? new Date() : '',
          status:  $('#meetingstatus option:selected').text() === "Closed" ? 0 : 1,
          docname: docname,
          docpath: docpath,
          Attendes:$('#attendingmeeting option:selected').toArray().map(item =>item.text).join(),
          AttendesEmail:$('#attendingmeeting option:selected').toArray().map(item => item.value).join(),
          // AttendesId: $('#attending option:selected').toArray().map(item => (item.value).split("|")[1]).join(),  
          AttendesId:$('#attendingmeeting option:selected').map(function(){return $(this).data("id")}).get().join(), 
                    checklist: getchecklist(),




        }
      }),
      contentType: "application/json; charset=utf-8",

      success: function (data) {

        if (data == 'failed') {
          alert('contact Admin')
        } else {
          $(location).attr('href', '/mymeeting')
        }
      }
    });
  }
}
function daysBetween(one, another) {
  return Math.round(Math.abs((+one) - (+another))/8.64e7);
}
function deletemeeting() {


  var _id = getUrlVars()["keyid"];
  var _url = '/fbpartnersfinance/deletemeeting';
  var result = confirm('Are you sure want to delete meeting')
  if (result) {
    $.ajax({
      url: _url,
      type: "POST",
      data: JSON.stringify({
        meeting: {
          id: _id

        }
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data == 'failed') {
          alert('contact Admin')
        } else {
          // $(location).attr('href', '/meeting')
          $(location).attr('href', '/mymeeting');
        }
      }
    });
  }

}

function formvalidator() {

  var isvalid = true;
  $('[data-valid]:not(#qkl-myModal11 [data-valid])').each(function () {
    var vl = $(this).val();
    var cnd = $(this).attr('data-valid').split('|');
    if (/^\s/g.test(this.value)) {
      this.value = this.value.replace(/^\s+/, '');
      isvalid = false;
      $(this).addClass('required')
    }
    for (var c in cnd) {

      switch (cnd[c]) {
        case 'required':
          if (!vl) {
            isvalid = false;
            $(this).addClass('required')
          }
          break;
        case 'email':
          if (!validateEmail(vl)) {
            isvalid = false;
            $(this).addClass('required')
          }
          break;
        case 'mobile':
          if (!validatemobile(vl)) {
            isvalid = false;
            $(this).addClass('required')
          }
          break;
        case 'text':
          if (!validatetext(vl)) {
            isvalid = false;
            $(this).addClass('required')
          }
          break;
        case 'number':
          if (!validatenumber(vl)) {
            isvalid = false;
            $(this).addClass('required')
          }
          break;
          case 'floatnumber':
            if (!validatefloat(vl)) {
              isvalid = false;
              $(this).addClass('required')
            }else{
              $(this).removeClass('required')
            }
          break;
        case 'date':
          break;
        case 'min':
          break;
        case 'max':
          break;




      }
    }

  });
  return isvalid;
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
function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}