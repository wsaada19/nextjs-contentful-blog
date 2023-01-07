import React from 'react';
import { TeamData } from 'types/nbaTeamData';
import Image from 'next/image';

export type TeamLeaderBoardProps = {
  teams: TeamData[];
  title: string;
  selector: (d: TeamData) => string | number;
  className?: string;
};

export const TeamLeaderBoard = ({ teams, title, selector, className }: TeamLeaderBoardProps) => {
  return (
    <div className={`p-2 text-sm ${className}`}>
      <h3 className="mb-1">{title}</h3>
      <table className="text-white w-full">
        {teams.map((team, index) => {
          return (
            <tr className="bg-gray-100 text-black border border-gray-400 h-8" key={team.name}>
              <td className="pl-4 w-0.5">{index + 1}.</td>
              <td className="w-4">
                <div className="pt-2">
                  <Image src={team.logo} height={24} width={24} alt={`${team.name} logo`}></Image>
                </div>
              </td>
              <td className="w-12">{`${team.name}`}</td>
              <td className="w-48">
                <div className={`m-3 p-1 bg-green-600 w-[6rem]`}>
                  <span>
                    <strong className="text-xs text-white">{selector(team)}</strong>
                  </span>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

const createBarSvg = () => {};
