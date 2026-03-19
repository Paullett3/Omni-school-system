/**
 * 🎓 STUDENT PROFILE Snippet
 * Location: client/src/pages/StudentProfile.jsx
 */

const StudentProfile = ({ user }) => {
  return (
    <div className="profile-card">
      {/* ❌ CRASH: If user is null, this kills the app */}
      <h1>Welcome, {user.name}</h1>

      {/* ✅ SAFE: If user is null, it shows 'Guest' instead of crashing */}
      <h1>Welcome, {user?.name || "Guest"}</h1>

      {/* 📊 DEEP NESTING: Perfect for performance/grades */}
      <p>Math Score: {user?.performance?.math ?? "N/A"}</p>

      {/* 📝 Logic:
          If user exists -> Check performance.
          If performance exists -> Show math.
          If any part is missing -> Show 'N/A'.
      */}
    </div>
  );
};
