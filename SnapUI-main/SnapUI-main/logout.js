var baseurl = 'https://www.snap.getboxxie.com/api'


$(".logout").click(function (event) {
    var token=localStorage.getItem("token")

    var settings = {
        "url": `${baseurl}/user/logout`,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.status=="success"){
            swal.fire({
                title: "Success",
                text: "You have been logout successfully",
                type: "success"
            }).then(function () {
                localStorage.clear();
                window.location = "login.html";
            });
        }
      });
})