"use client";
import { Button } from "@/components/ui/button";
import useKeyPressed from "@/utils/hooks/useKey";
import { cn } from "@/utils/ui-utils";
import { addMinutes, addSeconds, format } from "date-fns";
import { MicIcon, VoicemailIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

type Props = {};

const RecordButton = (props: Props) => {
  // function getLocalStream() {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: false, audio: true })
  //     .then((stream) => {
  //       // @ts-ignore
  //       window.localStream = stream; // A
  //       // @ts-ignore
  //       window.localAudio.srcObject = stream; // B
  //       // @ts-ignore
  //       window.localAudio.autoplay = true; // C
  //     })
  //     .catch((err) => {
  //       console.error(`you got an error: ${err}`);
  //     });
  //   console.log(navigator.mediaDevices);
  // }
  // useEffect(() => {
  //   getLocalStream();
  // }, []);

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  function formattedTime(seconds: number) {
    let dt = new Date(seconds * 1000);
    dt = addMinutes(dt, dt.getTimezoneOffset());
    return format(dt, "mm:ss");
  }
  return (
    <div className="fixed right-10 bottom-10">
      <Button
        onClick={() => (isRecording ? stopRecording() : startRecording())}
        onTouchStart={() => startRecording()}
        onTouchEnd={() => stopRecording()}
        variant={"default"}
        className={cn("h-14 gap-3 animate-pulse", {
          "w-14 h-14 animate-none": !isRecording,
        })}
      >
        <MicIcon size={24} />
        {isRecording && `Listening... ${formattedTime(recordingTime)}`}
      </Button>
    </div>
  );
};

export default RecordButton;
