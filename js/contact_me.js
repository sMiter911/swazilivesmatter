$(function () {
  $("form[name='appointment-form']").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behavior
      // get values from FORM
      var name = $("input[name='Name']").val();
      var email = $("input[name='Email']").val();
      var phone = $("input[name='Phone']").val();
      var date = $("input[name='Date']").val();
      var subject = $("select[name='subject']").val();
      var message = $("textarea[name='form_message']").val();

      $.ajax({
        url: "./mail/send_email.php", // Update the URL to your server-side script
        type: "POST",
        data: {
          Name: name,
          Email: email,
          Phone: phone,
          Date: date,
          subject: subject,
          form_message: message,
        },
        cache: false,
        success: function () {
          // Success message
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-success").append(
            "<strong>Your message has been sent. </strong>"
          );
          $("#success > .alert-success").append("</div>");

          // clear all fields
          $('form[name="appointment-form"]').trigger("reset");
        },
        error: function () {
          // Fail message
          $("#success").html("<div class='alert alert-danger'>");
          $("#success > .alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-danger").append(
            "<strong>Sorry " +
            name +
            ", it seems that our mail server is not responding. Please try again later!"
          );
          $("#success > .alert-danger").append("</div>");
          // clear all fields
          $('form[name="appointment-form"]').trigger("reset");
        },
      });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/* When clicking on Full hide fail/success boxes */
$(
  'input[name="Name"], input[name="Email"], input[name="Phone"], input[name="Date"], select[name="subject"], select[name="Doctor"], textarea[name="form_message"]'
).focus(function () {
  $("#success").html("");
});
