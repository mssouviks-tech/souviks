document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("whatsappForm");

    if(form){

        form.addEventListener("submit", function(e){

            e.preventDefault();

            const name =
                document.getElementById("name").value;

            const phone =
                document.getElementById("phone").value;

            const vehicle =
                document.getElementById("vehicle").value;

            const partnumber =
                document.getElementById("partnumber").value;

            const message =
                document.getElementById("message").value;

            const whatsappMessage =
`Hello Souviks,

Name: ${name}
Phone: ${phone}
Vehicle: ${vehicle}
Part Number: ${partnumber}

Requirement:
${message}`;

            const encoded =
                encodeURIComponent(whatsappMessage);

            window.open(
                `https://wa.me/917908215701?text=${encoded}`,
                "_blank"
            );

        });

    }

});
