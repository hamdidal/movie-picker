import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./sendEmail.css";
import { SendEmailProps } from "../../models/movies";

export const SendEmail = ({title}:SendEmailProps) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (!email || !subject || !message) {
      return toast.error("Please fill email, subject and message");
    }
    try {
      setLoading(true);
      const { data } = await axios.post(
        `/api/email`,
        {
          email,
          subject,
          message,
        },
        { baseURL: "http://localhost:4000" }
      );
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error("oh no!");
    }
  };
  return (
    <div className="send-email">
      <ToastContainer position="bottom-center" limit={1} />
      <div className="send-email-container">
        <form onSubmit={submitHandler}>
          <div className="send-email-form">
            <input
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            ></input>
            <label>Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="Subject"
              onChange={(e) => setSubject(e.target.value)}
            ></input>
            <textarea
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="message"
              defaultValue={title}
            ></textarea>
            <button disabled={loading} type="submit">
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
