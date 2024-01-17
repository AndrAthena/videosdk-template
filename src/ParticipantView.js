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
    <div className="participant-view">
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
          height={"100vh"}
          width={"auto"}
          onError={(err) => {
            console.error(err, "participant video error");
          }}
        />
      ) : null}
    </div>
  );
};
