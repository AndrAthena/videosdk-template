import { useParticipant } from "@videosdk.live/react-sdk";
import { useMemo } from "react";
import ReactPlayer from "react-player";

export const ParticipantView = ({ participantId }) => {
  const { webcamStream, webcamOn } = useParticipant(participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  return (
    <div
      style={{
        width: "auto",
        height: "100%",
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: "#1A1C22",
        borderRadius: "10px",
        overflow: "hidden",
      }}
      class="video-cover"
    >
      {webcamOn && webcamStream ? (
        <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"100%"}
          width={"100%"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      ) : null}
    </div>
  );
};
