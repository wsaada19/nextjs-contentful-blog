import React from 'react';
import { TeamData } from 'types/nbaTeamData';
import Image from 'next/image';

export type TeamLeaderBoardProps = {
  teams: TeamData[];
  className?: string;
};

export const TeamLeaderBoard = ({ teams, className }: TeamLeaderBoardProps) => {
  return (
    <div className={`text-sm ${className}`}>
      <table className="text-white w-full">
        <thead className="text-sm h-8 bg-blue-900 md:border md:border-gray-400 md:border-b-0">
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>ORTG</th>
            <th>DRTG</th>
            <th>Net</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => {
            return (
              <tr
                className="h-6 text-black border border-gray-400 border-t-0 dark:bg-white even:bg-light dark:even:bg-light"
                key={team.name}
              >
                <td className="pl-4 w-1/12">{index + 1}</td>
                <td className="w-4">
                  <div>
                    <Image
                      src={team.logo}
                      height={24}
                      width={24}
                      alt={`${team.name} logo`}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    ></Image>
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
        </tbody>
      </table>
    </div>
  );
};
