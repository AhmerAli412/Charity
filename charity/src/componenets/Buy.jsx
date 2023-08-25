import { ethers } from "ethers";

const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const amount = { value: ethers.utils.parseEther("0.001") };
    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();
    console.log("Transaction is done");
  };

  return (
    <div className="container mx-auto mt-8 px-4 sm:px-0">
      <form onSubmit={buyChai}>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            id="name"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Message</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            id="message"
            placeholder="Enter Your Message"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
          disabled={!state.contract}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default Buy;
