jQuery(document).ready(function(e){var t=new plupload.Uploader(gallery_settings);t.bind("Init",function(t){var n=e("#plupload-upload-ui");if(t.features.dragdrop){n.addClass("drag-drop");e("#drag-drop-area").bind("dragover.wp-uploader",function(){n.addClass("drag-over");e("#gallery div[data-panel]").removeClass("active");e("#gallery .media-router a").removeClass("active");e('#gallery a[data-click="1"]').addClass("active");e('#gallery div[data-panel="1"]').addClass("active")}).bind("dragleave.wp-uploader, drop.wp-uploader",function(){n.removeClass("drag-over")})}else{n.removeClass("drag-drop");e("#drag-drop-area").unbind(".wp-uploader")}});t.init();t.bind("FilesAdded",function(t,n){var r=104857600,i=parseInt(t.settings.max_file_size,10);plupload.each(n,function(n){if(!(i>r&&n.size>r&&t.runtime!="html5")){e("#gallery div[data-panel]").removeClass("active");e("#gallery .media-router a").removeClass("active");e('#gallery a[data-click="2"]').addClass("active");e('#gallery div[data-panel="2"]').addClass("active")}});t.refresh();t.start()});t.bind("UploadProgress",function(e,t){});t.bind("FileUploaded",function(t,n,r){src=r.response;e("#gallery .scrollable ul").prepend('<li><img src="'+src+'"/></li>')});e("#gallery .media-router a").click(function(t){t.preventDefault();var n=e(this).data("click");e("#gallery div[data-panel]").removeClass("active");e("#gallery .media-router a").removeClass("active");e(this).addClass("active");e("#gallery div[data-panel="+n+"]").addClass("active")});e("#gallery .delete-wrap ul li").click(function(t){t.preventDefault();e("#gallery .delete").removeClass("active");e("#gallery .delete").addClass("active");e(this).toggleClass("active");var n=[];e("#gallery .delete-wrap ul li.active").each(function(t){var r=e(this).data("id");n[t]=r});e("#gallery .delete a").attr("data-ids",n)});e("#gallery .delete a").click(function(t){e("#gallery .delete").removeClass("active");e("#gallery .delete-wrap ul li.active").each(function(){e(this).removeClass("active");e("#gallery .add-wrap ul").prepend(this)});var n=e(this).data("ids");e.ajax({url:ajaxurl,type:"POST",async:!0,cache:!1,dataType:"json",data:{action:"remove_attachment",ids:n,post_id:e("#post_ID").val()}})});e("#gallery .add-wrap ul li").click(function(t){t.preventDefault();e("#gallery .add").addClass("active");e(this).toggleClass("active");var n=[];e("#gallery .add-wrap ul li.active").each(function(t){var r=e(this).data("id");n[t]=r});e("#gallery .add a").attr("data-ids",n)});e("#gallery .add a").click(function(t){e("#gallery .add").removeClass("active");e("#gallery .add-wrap").removeClass("active");e("#gallery a[data-click]").removeClass("active");e("#gallery .delete-wrap").addClass("active");e("#gallery .delete-wrap").addClass("active");e('#gallery a[data-click="2"]').addClass("active");e("#gallery .add-wrap ul li.active").each(function(){e(this).removeClass("active");e("#gallery .delete-wrap ul").prepend(this)});var n=e(this).data("ids");e.ajax({url:ajaxurl,type:"POST",async:!0,cache:!1,dataType:"json",data:{action:"add_attachment",ids:n,post_id:e("#post_ID").val()}})});e(".scrollable ul").sortable({update:function(t,n){var r=[];e(this).children("li").each(function(t){var n=e(this).data("id");r[t]=n});e.ajax({url:ajaxurl,type:"POST",async:!0,cache:!1,dataType:"json",data:{action:"add_attachment",order:r,post_id:e("#post_ID").val()}})}})});