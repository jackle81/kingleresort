$("body").on('submit', '#contacts_form', function (e) {
    self = $(this);
    var dataSerialize = self.serializeArray();
    dataSerialize.push({name: 'submit', value: 1});
    dataSerialize.push({name: 'type', value: 'contact'});
    $.ajax({
        type: self.attr("method"),
        url: self.attr("action"),
        crossDomain: true,
        method: self.attr("method"),
        data: dataSerialize, // serializes the form's elements.
        dataType: 'json',
        beforeSend: function(xhr) {
            var self = this;
            $('#contacts_submit').attr('disabled', 'disabled');
            $('#contacts_submit').html('Sending');
            $.each(dataSerialize,function(idx,item){
                console.debug(idx, item.name);
                if (item.name == 'authorization') {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + item.value);
                    delete self.data[idx];
                }
            });
        },
        success: function (data) {
            console.debug(data);
            if (data.error) {
                data.status = 'error';
                data.message = data.error_description;
            }
            if (data.status == 'error') {
                if (typeof(data.message) == 'object') {
                    var message = '';
                    $.each(data.message,function(k,v){
                        message += v + '<br>';
                    });
                }
                else {
                    var message = data.message;
                }
                $("#contacts_submit").removeAttr('disabled');
                return false;
            }
            $.magnificPopup.open({
                items: {
                    src: '#modal-contact-us-thank-you'
                },
                type: 'inline'
            });
            $('#contacts_submit').removeAttr('disabled').html('Submit');
        },
        error: function (e) {
            console.debug(e);
            // window.location.reload();
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.
});


$("body").on('submit', '#modal_contacts_form', function (e) {
    self = $(this);
    var dataSerialize = self.serializeArray();
    dataSerialize.push({name: 'submit', value: 1});
    dataSerialize.push({name: 'type', value: 'reserve'});
    $.ajax({
        type: self.attr("method"),
        url: self.attr("action"),
        crossDomain: true,
        method: self.attr("method"),
        data: dataSerialize, // serializes the form's elements.
        dataType: 'json',
        beforeSend: function(xhr) {
            var self = this;
            $('#modal_contacts_submit').attr('disabled', 'disabled');
            $('#modal_contacts_submit').html('Sending');
            $.each(dataSerialize,function(idx,item){
                console.debug(idx, item.name);
                if (item.name == 'authorization') {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + item.value);
                    delete self.data[idx];
                }
            });
        },
        success: function (data) {
            console.debug(data);
            if (data.error) {
                data.status = 'error';
                data.message = data.error_description;
            }
            if (data.status == 'error') {
                if (typeof(data.message) == 'object') {
                    var message = '';
                    $.each(data.message,function(k,v){
                        message += v + '<br>';
                    });
                }
                else {
                    var message = data.message;
                }
                $("#modal_contacts_submit").removeAttr('disabled').html('Submit');
                return false;
            }
            $('#modal_contacts_form')[0].reset();
            $('#reserve_thanks').show();
            $('#modal_contacts_submit').hide();
        },
        error: function (e) {
            console.debug(e);
            // window.location.reload();
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.
});

$("body").on('submit', '#subcribers_form', function (e) {
    self = $(this);
    var dataSerialize = self.serializeArray();
    dataSerialize.push({name: 'submit', value: 1});
    $.ajax({
        type: self.attr("method"),
        url: self.attr("action"),
        crossDomain: true,
        method: self.attr("method"),
        data: dataSerialize, // serializes the form's elements.
        dataType: 'json',
        beforeSend: function(xhr) {
            var self = this;
            $('#subcribers_submit').attr('disabled', 'disabled');
            $('#subcribers_submit').html('Sending');
            $.each(dataSerialize,function(idx,item){
                console.debug(idx, item.name);
                if (item.name == 'authorization') {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + item.value);
                    delete self.data[idx];
                }
            });
        },
        success: function (data) {
            console.debug(data);
            if (data.error) {
                data.status = 'error';
                data.message = data.error_description;
            }
            if (data.status == 'error') {
                if (typeof(data.message) == 'object') {
                    var message = '';
                    $.each(data.message,function(k,v){
                        message += v + '<br>';
                    });
                }
                else {
                    var message = data.message;
                }
                alert(message);
                $("#subcribers_submit").removeAttr('disabled');
                return false;
            }
            $.magnificPopup.open({
                items: {
                    src: '#modal-contact-us-thank-you'
                },
                type: 'inline'
            });
            $("#subcribers_submit").removeAttr('disabled');
            return false;
        },
        error: function (e) {
            console.debug(e);
            // window.location.reload();
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.
});

$( document ).ready(function() {
    $('.showmore').click(function(){
        var display = $(this).closest('.section-body').find('.card.more').css('display') == 'none' ? 'hidden' : 'show'; 
        
        if(display == 'hidden'){
            $(this).closest('.section-body').find('.card.more').show('slow'); 
            $(this).find('.text_show_more').hide();
            $(this).find('.text_show_less').show();
            $(this).find('svg').css("transform", "rotate(270deg)").show('slow');
        }else{
            $(this).closest('.section-body').find('.card.more').hide('slow'); 
            $(this).find('.text_show_more').show();
            $(this).find('.text_show_less').hide();
            $(this).find('svg').css("transform", "rotate(90deg)").show('slow');
        }
    });
});
