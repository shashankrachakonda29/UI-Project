

var express = require('express'),
    router = express.Router(),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    drvalidate = require('../libs/drvalidate').drvalidate,
    taskshashank= require("../models/shashanktask")

    router.get("/task/getstask", function (req, res) {
        new drvalidate(req, res, function (err, _session) {
            if (!err) {
                taskshashank.find({
                    'tenant_id': _session.tenant_id,
                }).exec(
                    function (err, docs) {
                        if (!err) {
                            res.send(docs);
                        } else {
                            res.sendStatus(500);
                        }
                    });
            } else {
                res.sendStatus(403);
            }
        });
    });
    // get only one data
    router.get("/task/getstaskdetails", function (req, res) {
        new drvalidate(req, res, function (err, _session) {
            if (!err) {
                var id = req.query.keyid;
                taskshashank.findOne({
                    'tenant_id': _session.tenant_id,
                    '_id': id,
                }).exec(
                    function (err, docs) {
                        if (!err) {
                            res.send(docs);
                        } else {
             
                            res.sendStatus(500);
                        }
                    });
            } else {
                res.sendStatus(403);
            }
        });
    });
    // creating  new task data
    router.post("/task/createstask", function (req, res) {
        drvalidate(req, res, function (err, _session) {
            if(!err){
                var _stask = req.body.stask;
                var _doc=[];
                var _cdoc={};
                _cdoc['docname']=_stask.docname;
                _cdoc['docpath']=_stask.docpath;
                _doc.push(_cdoc)
                var newstask = new taskshashank({
                        tenant_id: _session.tenant_id,
                        bankname: _session.bank,
                        name: _stask.name,
                        type: _stask.type,
                        startDate:_stask.startdate,
                        endDate: _stask.enddate,
                        description:_stask.description,
                        owner:_stask.owner,
                    })
                    if(_stask.docpath !== undefined){
                        newstask.staskdocs=_doc;
                    }
                    newstask.save(function (err) {
                    if (!err) {
                        console.log(newstask)
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(500);
                    }
                });
            }
            else{
                res.sendStatus(403);
            }
    
        // if (!err) {
        //     var _stask = req.body.stask;
    
        //     taskproducts.findOne({
    
        //     }, function (err, doc) {
        //         if (!err) {
        //             if (doc) {
        //                 if(doc.name==data.pname){
        //                     res.send('Name is already Exist')
        //                 }
        //             } else {
        //                 var newstask = new taskproducts({
        //                     tenant_id: _session.tenant_id,
        //                     bankname: _session.bank,
        //                     name: _stask.pname,
        //                     type: _stask.type,
        //                     startDate:_stask.startdate,
        //                     endDate: _stask.enddate,
        //                     description:_stask.description,
        //                     owner:_stask.owner,
        //                 });
        //                 newstask.save(function (err) {
        //                     if (!err) {
        //                         res.sendStatus(200);
        //                     } else {
        //                         res.sendStatus(500);
        //                     }
        //                 });
    
        //             }
        //         }
        //     });
        // } else {
        //     res.sendStatus(403);
        // }
    
        });
    });
    // update task Data
    router.post("/task/updatestask",function(req, res) {
        drvalidate(req,res, function (err, _session) {
                     if (!err) {
                        var _stask= req.body.stask;
                        var _record = {};
        
                        _record['name'] = _stask.name;
                        _record['type'] = _stask.type;
                        _record['startDate'] =_stask.startdate;
                        _record['endDate'] = _stask.enddate;
                        _record['description'] = _stask.description;
                        _record['owner'] = _stask.owner;
                        
                        
                        if(_stask.docpath==undefined){
                            taskshashank.update({
                                'tenant_id':  _session.tenant_id,
                                '_id':_stask.id,
                            }, {
                                 "$set": _record
                            }, function (err) {
                                 if (!err) {
                                     res.sendStatus(200);
                                                   // res.send(_record)
                                  } else {
                                      res.sendStatus(500);
                                   } 
                            });
                                
                        }else{
                            updatestaskdocs(_stask,_session.tenant_id,_session.bank,_stask.id,function(err){
                                if(err){
                                    res.sendStatus(500)
                                }else{
                                    taskshashank.update({
                                        'tenant_id':  _session.tenant_id,
                                        '_id':_stask.id,
                                    }, {
                                         "$set": _record
                                    }, function (err) {
                                        if (!err) {
                                             res.sendStatus(200);
                                         } else {
                                              res.sendStatus(500);
                                         }
                                    })
                                }
                            })
                        }
                    } else {
                        res.sendStatus(403);
                    }
                });
        
        });
        function updatestaskdocs(_stask, tenant_id,bank,_staskid ,fn) {
            var _record = {};
            var _doc = [];
            var _cdoc = {};
            _cdoc['docname'] = _stask.docname;
            _cdoc['docpath'] = _stask.docpath;
            _doc.push(_cdoc);
            _record['staskdocs'] = _doc;
            taskshashank.update({
                'tenant_id': tenant_id,
                '_id': _staskid
            }, {
                "$set": _record
            }, function (err) {
        
                if (err) {
                    fn(err)
                } else {
                    fn(null)
                }
            })
        
        }
        // Delete Task Data
        router.post("/task/deletestask", function (req, res) {
            drvalidate(req, res, function (err, _session) {
                if (!err) {
                    var _stask= req.body.stask;
                    taskshashank.remove({
                        'tenant_id': _session.tenant_id,
                        '_id': _stask.id
                    }, function (err, doc) {
                        if (!err) {
                            res.sendStatus(200);
                        } else {
                            res.sendStatus(500);
                        }
                    });
                } else {
                    res.sendStatus(403);
                }
            });
        });
        router.post('/task/uploadtemp', function (req, res) {

            var docname = req.query.docname;
            var page = req.query.page;
        
        
            new drvalidate(req, res, function (err, _session) {
                if (!err) {
                    var form = new formidable.IncomingForm();
                    form.parse(req, function (err, fields, files) {
                        res.writeHead(200, {
                            'content-type': 'text/plain'
                        });
                    });
        
                    form.on('end', function (fields, files) {
        
                        var temp_path = this.openedFiles[0].path;
        
        
        
        
                   
                        /* The file name of the uploaded file */
                        //var file_name = uuid.v1()+this.openedFiles[0].name;
                        var extn = this.openedFiles[0].name.split('.').pop()
        
                        /* The file name of the uploaded file */
                        var file_name = uuid.v1() + docname + '.' + extn;
                        // var file_name = uuid.v1()+docname;
        
                        /* Location where we want to copy the uploaded file */
        
                        var new_location = path.join('./task/', _session.bank, page);
        
                        fse.copy(temp_path, new_location + '/' + file_name, function (err) {
                            if (err) {
                                res.sendStatus(500);
        
                            } else {
                                res.end(file_name);
                            }
        
                        });
                    });
        
        
        
                } else {
                    res.sendStatus(403);
                }
            });
        
        });

        router.get("/task/viewodoc", function (req, res) {
            //var loanid =req.query.keyid
            var docname = req.query.docname;
            new drvalidate(req, res, function (err, _session) {
                if (!err) {
                    var new_location = path.join('./task/', _session.bank, docname);
        
                    fs.exists(new_location, function (exists) {
                        if (exists) {
                            res.writeHead(200, {
                                "Content-Type": "application/octet-stream",
                                "Content-Disposition": "attachment; filename=" + docname
                               
                            });
                            fs.createReadStream(new_location).pipe(res);
                        } else {
                            res.writeHead(400, {
                                "Content-Type": "text/plain"
                            });
                            res.end("ERROR File does not exist");
                        }
                    });
                } else {
                    res.sendStatus(403);
                }
            });
        });
    
module.exports=router