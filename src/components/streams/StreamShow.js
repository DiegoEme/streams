import React, { useEffect } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = ({ match, fetchStream, stream }) => {
  let player;
  useEffect(() => {
    fetchStream(match.params.id);
    buildPlayer();

    return () => {
      player.destroy();
    };
  }, [fetchStream, match.params.id]);

  const buildPlayer = () => {
    if (!stream) {
      return;
    }
    player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${match.params.id}.flv`,
    });
    console.log(player);
    player.attachMediaElement(videoRef.current);
    player.load();
  };

  const videoRef = React.createRef();

  return (
    <div>
      {!stream ? (
        "Loading..."
      ) : (
        <div>
          <video ref={videoRef} style={{ width: "100%" }} controls />
          <h1>{stream.title}</h1>
          <h5>{stream.description}</h5>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
