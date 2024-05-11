import baseUrl from "../assets/baseUrl";
import { useState } from "react";
export default function Signup({ stat }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  if (document.cookie.includes("username")) {
    stat[1]({ ...stat[0], signup: false, login: true });
  }
  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    fetch(`${baseUrl}user/signup`, {
      method: "POST",
      body: form,
    })
      .then((res) => res.text())
      .then((res) => res.slice(res.indexOf("{"), res.length))
      .then((res) => JSON.parse(res))
      .then((res) => {
        setFormData({
          username: "",
          email: "",
        });
        if (res.payload.statusCode == 200) {
          window.localStorage.setItem(
            "username",
            res.payload.datas[0].username
          );
          stat[1]({ ...stat[0], signup: false, token: true });
        } else {
          alert(res.payload.message);
        }
      });
  }
  function onClick() {
    stat[1]({ ...stat[0], signup: false, login: true });
  }
  return (
    <div className="container">
      <h1 className="my-3">KALKULATOR PAKAN</h1>
      <button className="btn btn-success float-end my-3" onClick={onClick}>
        Login
      </button>
      <form
        method="post"
        onSubmit={(e) => onSubmit(e)}
        onChange={(e) => onChange(e)}
      >
        <input
          required
          className="form-control mb-3"
          type="text"
          value={formData.username}
          name="username"
          id="username"
          placeholder="Username"
        />
        <input
          required
          className="form-control"
          type="email"
          value={formData.email}
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          className="btn btn-primary my-3"
          type="submit"
          value="Registrasi"
        />
      </form>
    </div>
  );
}
