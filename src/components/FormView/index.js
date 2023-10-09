const FormView = () => (
  <div className="mainDiv">
    <form>
      <h1 className="login-head">Fill the form</h1>
      <label htmlFor="nameTaker">NAME</label>
      <input
        id="nameTaker"
        type="text"
        placeholder="Name"
        className="input-ele"
      />
      <label htmlFor="passTaker">Email</label>
      <input
        id="passTaker"
        type="email"
        placeholder="email"
        className="input-ele"
      />
      <label htmlFor="passTaker">Cover Letter</label>
      <textarea rows="8" cols="55" id="message">
        type here
      </textarea>
      <label htmlFor="passTaker">attach file</label>
      <input id="passTaker" type="file" className="input-ele" />
      <button className="login-button" type="submit">
        Submit
      </button>
    </form>
  </div>
)

export default FormView
