import { Constants, useMeeting } from "@videosdk.live/react-sdk";
import { ParticipantsAudioPlayer } from "./ParticipantsAudioPlayer";
import { ParticipantView } from "./ParticipantView";

export const MeetingContainer = () => {
  const { isMeetingJoined, participants } = useMeeting();

  const remoteSpeakers = [...participants.values()].filter((participant) => {
    return (
      participant.mode === Constants.modes.CONFERENCE && !participant.local
    );
  });

  return isMeetingJoined ? (
    <div>
      <ParticipantsAudioPlayer />
      <div>
        {[...remoteSpeakers].map((participant) => {
          return (
            <ParticipantView
              key={participant.id}
              participantId={participant.id}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div className="container-loader">
      <div className="loader"></div>
    </div>
  );
};
