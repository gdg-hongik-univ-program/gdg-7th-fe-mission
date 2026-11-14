function ErrorMessage({ message }) {
  return (
    <div className="status-message error">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;