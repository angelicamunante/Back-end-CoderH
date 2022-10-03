const socket = io();

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SECCIÓN MENSAJES
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
const buttonChat = document.getElementById("buttonChat");

socket.on("messages", (data) => {
  let msgHtml = "";
  msgHtml = data.map((item) => {
    return `<span>
    <div class="d-flex flex-column" style="width:500px">
     <div class="d-flex justify-content-between w-100 bg-dark">
     <img src="${item.author.avatar}" style="width:50px;height:50px">
      <p class="text-light fw-bolder" >${item.author.email}</p>
    </div>
      <p class="text-success"><em>${item.text}</em></p>
    </span>
    </div>
    <hr>
    `;
  });
  document.getElementById("msg").innerHTML = msgHtml;
});

buttonChat.addEventListener("click", (e) => {
  const msg = {
    author: {
      email: document.getElementById("email").value,
      nombre: document.getElementById("name").value,
      apellido: document.getElementById("lastname").value,
      edad: document.getElementById("age").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("comment").value,
  };
  socket.emit("new-msg", msg);
});