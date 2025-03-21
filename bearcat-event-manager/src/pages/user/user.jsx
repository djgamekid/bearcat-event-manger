import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import NavbarUser from "../../components/navbar-user";
import { useEvents } from "../../context/eventContext";

function User() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { events, loading } = useEvents();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      setLoadingUser(false);
    }
  }, [currentUser, navigate]);

  // Get featured events (most recent 6 events)
  const featuredEvents = events
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  if (loadingUser || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <>
      <NavbarUser />
      <div className="min-h-screen bg-base-200">
        {/* Simple Welcome Section */}
        <div className="hero bg-base-100 py-8">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold">
                Welcome back{currentUser?.displayName ? `, ${currentUser.displayName}` : ''}! 👋
              </h1>
            </div>
          </div>
        </div>

        {/* Featured Events Section */}
        <div className="p-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <div key={event.id} className="card bg-base-100 shadow-xl">
                <figure className="px-4 pt-4">
                  <img
                    src={event.imageUrl || "https://placehold.co/600x400?text=Event"}
                    alt={event.title}
                    className="rounded-xl h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{event.title}</h3>
                  <p className="text-sm text-base-content/70">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="line-clamp-2">{event.description}</p>
                  <div className="card-actions justify-end mt-4">
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate(`/user-events/${event.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
