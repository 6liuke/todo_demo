import Dashboard from './Dashboard';

function Home() {
  return (
    <div className="home-container">
      <div className="grid-container">
        {/* <div className="grid-item dashboard-section"> */}
          <Dashboard />
        {/* </div> */}
        <div className="grid-item">
          <h2>功能区域 2</h2>
          <p>待开发...</p>
        </div>
        <div className="grid-item">
          <h2>功能区域 3</h2>
          <p>待开发...</p>
        </div>
        <div className="grid-item">
          <h2>功能区域 4</h2>
          <p>待开发...</p>
        </div>
      </div>
    </div>
  );
}

export default Home;