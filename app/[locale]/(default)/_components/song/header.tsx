"use client";

import {
  MdHeadset,
  MdOutlineDownload,
  MdOutlinePlayArrow,
  MdOutlineShare,
} from "react-icons/md";

import { AiOutlineLike } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Song } from "@/types/song";
import moment from "moment";
import { useAppContext } from "@/contexts/app";
import { useTranslations } from "next-intl";

export default function ({ song }: { song: Song }) {
  const t = useTranslations("song");

  const { appendPlaylist, currentSong, setCurrentSong, setCurrentSongIndex } =
    useAppContext();

  const playSong = function (song: Song) {
    appendPlaylist(song);
    setCurrentSong(song);
    setCurrentSongIndex(0);
  };

  return (
    <div className="flex items-center gap-x-8">
      <Image
        src={song.image_url}
        alt={song.title}
        width={160}
        height={160}
        className="rounded-lg"
      />

      <div className="flex flex-col gap-y-2 mr-8">
        <h1 className="text-xl font-medium">{song.title}</h1>
        <p className="text-md">{song.tags}</p>
        <p className="text-md">
          {moment(song.created_at).format("DD / MM / YYYY")}
        </p>

        <div className="mt-2 flex gap-x-4 text-md text-base-content">
          {currentSong && currentSong.uuid === song.uuid ? (
            <Button
              size="sm"
              className="flex items-center gap-x-1 w-20 bg-base-300"
            >
              <img src="/playing.gif" />
            </Button>
          ) : (
            <Button
              size="sm"
              className="flex items-center gap-x-1 w-20"
              onClick={() => playSong(song)}
            >
              <MdOutlinePlayArrow className="text-2xl" />
              {t("play")}
            </Button>
          )}
          <Button
            size="sm"
            className="flex items-center gap-x-1 bg-base-300 text-base-content"
          >
            <MdHeadset className="text-xl" />
            {song.play_count}
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-x-1 bg-base-300 text-base-content"
          >
            <AiOutlineLike className="text-xl" />
            {song.upvote_count}
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-x-1 bg-base-300 text-base-content"
          >
            <MdOutlineShare className="text-xl" />
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-x-1 bg-base-300 text-base-content"
          >
            <MdOutlineDownload className="text-2xl" />
          </Button>
        </div>
      </div>
    </div>
  );
}