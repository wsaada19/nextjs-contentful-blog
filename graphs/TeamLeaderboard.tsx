import React from 'react';
import { TeamData } from 'types/nbaTeamData';
import Image from 'next/image';

export type TeamLeaderBoardProps = {
  teams: TeamData[];
  title: string;
  className?: string;
};

export const TeamLeaderBoard = ({ teams, title, className }: TeamLeaderBoardProps) => {
  return (
    <div className={`text-sm ${className}`}>
      <table className="text-white w-full">
        <tr className="text-sm border border-gray-400 border-b-0 h-6 bg-blue-900">
          <th></th>
          <th></th>
          <th></th>
          <th>ORTG</th>
          <th>DRTG</th>
          <th>Net</th>
          <th>Wins</th>
        </tr>
        {teams.map((team, index) => {
          return (
            <tr
              className="bg-gray-100 text-black border border-gray-400 border-t-0 even:bg-gray-300"
              key={team.name}
            >
              <td className="pl-4 w-1/12">{index + 1}</td>
              <td className="w-4">
                <div className="pt-2">
                  <Image src={team.logo} height={24} width={24} alt={`${team.name} logo`}></Image>
                </div>
              </td>
              <td className="w-10 font-semibold">{`${team.name}`}</td>
              <td className="w-10 text-center">{team.offRating}</td>
              <td className="w-10 text-center">{team.defRating}</td>
              <td className="w-10 text-center">{(team.offRating - team.defRating).toFixed(1)}</td>
              <td className="w-10 text-center">{team.wins}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
