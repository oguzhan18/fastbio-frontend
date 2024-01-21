import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Logout from "../Logout";
import { Skeleton } from "@/components/ui/skeleton";
interface Profile {
  userOwner: string | null;
  _id: string;
  name: string;
  bio: string;
  username: string;
  links: string[];
  imageUrl: string;
}

interface ProfilesGridProps {
  selectedProfileId: string | null;
}

const ProfilesGrid: React.FC<ProfilesGridProps> = ({ selectedProfileId }) => {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get<Profile[]>(
          `${'https://fastbio-backend.onrender.com'}/profiles`
        );
        setProfiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Filter out the selected profile
  const filteredProfiles = selectedProfileId
    ? profiles.filter((profile) => profile._id !== selectedProfileId)
    : profiles;

  // Remove profiles with duplicate usernames, keeping only the first occurrence
  const uniqueUsernames = new Set<string>();
  const uniqueProfiles = filteredProfiles.filter((profile) => {
    if (uniqueUsernames.has(profile.username)) {
      return false;
    }
    uniqueUsernames.add(profile.username);
    return true;
  });

  // Filter profiles based on the search query
  const filteredSearchProfiles = uniqueProfiles.filter((profile) =>
    profile.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-8 min-h-[100dvh]">
      <h1 className="md:text-5xl text-4xl md:mb-20 mb-10 md:mt-32 mt-24 sm:leading-[3.5rem] font-bold bg-gradient-to-r from-[#bb0486] to-[#3604b1] text-transparent bg-clip-text">
        Discover a World of Faces
      </h1>

      <div className="flex w-full md:mb-20 mb-10 max-w-xl">
        <Input
          type="text"
          placeholder="Search by username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="py-2 px-5 border rounded-md"
        />
      </div>
      {!loading ? (
        <div className="w-full justify-center items-center max-w-7xl md:flex flex-wrap">
          {filteredSearchProfiles.map((profile) => (
            <Link
              key={profile._id}
              className="w-fit m-5 hover:scale-[102%] transition-all duration-200"
              href={`https://fastbio-frontend.vercel.app/${profile.username}`}
            >
              <div className="flex border hover:border-primary/50 transition-all duration-200 rounded-2xl h-40 md:w-80 flex-col justify-center items-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    className="object-cover"
                    src={profile.imageUrl}
                  />
                  <AvatarFallback>{profile.username}</AvatarFallback>
                </Avatar>
                <div className="max-w-xl flex flex-col justify-center items-center mx-8 mt-3">
                  <div className="flex w-full justify-center items-center max-w-md">
                     <div className="text-xs">@{profile.username}</div>
                  </div>
                  {profile.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full justify-center items-center max-w-7xl md:flex flex-wrap">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="md:w-fit w-full md:m-5 my-5 hover:scale-[102%] transition-all duration-200"
              >
                <div className="flex flex-col w-full h-[100dvh] justify-center items-center">
                  <div className="max-w-xl flex flex-col justify-center items-center">
                    <div className="flex w-full justify-center items-center max-w-md">
                      <img className="loading-img w-10" width={300} src="/fast-bio.png" alt="" />
                    </div>
                    <div className="text-xl">loading</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProfilesGrid;
