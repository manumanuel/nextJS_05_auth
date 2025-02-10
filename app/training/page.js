import { redirect } from "next/navigation";

import { getTrainings } from "@/lib/training";
import { verifyAuthSession } from "@/lib/auth";

export default async function TrainingPage() {
  const validUser = await verifyAuthSession();
  if (!validUser.user) {
    redirect("/login");
  }
  const trainingSessions = getTrainings();

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {trainingSessions.map((training) => (
          <li key={training.id}>
            <img src={`/trainings/${training.image}`} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
