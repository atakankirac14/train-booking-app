import SearchForm from "../components/SearchForm";
import trainImage from "../assets/train.png";

function Home() {
  return (
    <div className="flex flex-col 2xl:flex-row">
      {/* Left Side */}
      <div className="w-full 2xl:w-1/2 p-4 flex justify-center 2xl:justify-end items-start">
        <div className="w-full max-w-[750px] flex flex-col gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-left p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Welcome to SolarRail – Europe’s First Solar Train Operator
            </h1>
            <p className="mt-4 sm:mt-8 text-base sm:text-lg">
              Experience fast, comfortable, and 100% solar-powered journeys that
              put the planet first. <br className="hidden sm:inline" />
              Skip the airport hassle, reduce your carbon footprint, and arrive
              in style—with zero emissions.
            </p>
          </div>
          <SearchForm />
        </div>
      </div>

      {/* Right Side - Image (visible only above 1536px) */}
      <div className="w-1/2 hidden 2xl:flex items-start justify-start p-4">
        <img
          src={trainImage}
          alt="Train"
          className="max-w-[700px] max-h-[500px] object-contain rounded"
        />
      </div>
    </div>
  );
}

export default Home;
