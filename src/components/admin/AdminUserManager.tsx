import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

type User = {
  id: string;
  email: string;
  isBanned?: boolean;
  isDisabled?: boolean;
};

export default function AdminUserManager() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), snapshot => {
      const userData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      setUsers(userData);
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  const updateUserStatus = async (id: string, field: keyof User, value: boolean) => {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, { [field]: value });
  };

  const deleteUser = async (id: string) => {
  // Delete from Firestore
  await deleteDoc(doc(db, "users", id));

  // Delete from allowedUsers
  await deleteDoc(doc(db, "allowedUsers", id)).catch(() => {});

  // Delete from Firebase Authentication via Admin SDK API
  await fetch(`http://localhost:5001/api/delete-user/${id}`, {
    method: "DELETE",
  });

  setUsers(prev => prev.filter(user => user.id !== id));
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Email</th>
            <th className="p-2">Banned</th>
            <th className="p-2">Disabled</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.isBanned ? "Yes" : "No"}</td>
              <td className="p-2">{user.isDisabled ? "Yes" : "No"}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => updateUserStatus(user.id, "isBanned", !user.isBanned)}
                  className="text-sm bg-yellow-200 px-2 py-1 rounded"
                >
                  {user.isBanned ? "Unban" : "Ban"}
                </button>
                <button
                  onClick={() => updateUserStatus(user.id, "isDisabled", !user.isDisabled)}
                  className="text-sm bg-blue-200 px-2 py-1 rounded"
                >
                  {user.isDisabled ? "Enable" : "Disable"}
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-sm bg-red-300 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
