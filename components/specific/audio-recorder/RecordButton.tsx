"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { uploadAudio } from "@/utils/actions/chapters";
import useKeyPressed from "@/utils/hooks/useKey";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { cn } from "@/utils/ui-utils";
import { addMinutes, addSeconds, format } from "date-fns";
import { MicIcon, VoicemailIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  ownerId: string;
  chapterId: string;
};

const RecordButton = ({ chapterId, ownerId }: Props) => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const uploadAudioMutation = useMutation({
    mutationFn: ({ fileBlob }: { fileBlob: Blob }) =>
      uploadAudio(supabase, chapterId, fileBlob),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [chapterId, "audio"] });
    },
  });

  const { toast } = useToast();

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder({}, (exp) => {
    toast({ title: "Unable to record audio", description: exp.message });
  });

  function formattedTime(seconds: number) {
    let dt = new Date(seconds * 1000);
    dt = addMinutes(dt, dt.getTimezoneOffset());
    return format(dt, "mm:ss");
  }

  if (!user || user.id !== ownerId) return null;

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
      {recordingBlob && (
        <Button
          onClick={() =>
            uploadAudioMutation.mutate({ fileBlob: recordingBlob })
          }
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default RecordButton;
