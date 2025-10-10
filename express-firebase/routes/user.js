const express = require('express');
const router = express.Router();
const { db } = require('../firebase');


const COLLECTION = 'users';


// Create user
router.post('/', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });

    console.log(`Creating user: ${name} - ${email} - ${age}`);

    const newUser = { name, email, age: age || null, createdAt: new Date() };
    const docRef = await db.collection(COLLECTION).add(newUser);
    const doc = await docRef.get();
    return res.status(201).json({ id: docRef.id, ...doc.data() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server_error', message: err.message });
  }
});

// Read all users (with simple pagination: ?limit=10&startAfter=<docId>)
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const startAfter = req.query.startAfter; // id del documento


    let q = db.collection(COLLECTION).orderBy('createdAt', 'desc').limit(limit);
    if (startAfter) {
      const snap = await db.collection(COLLECTION).doc(startAfter).get();
      if (snap.exists) q = q.startAfter(snap);
    }


    const snap = await q.get();
    const users = [];
    snap.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
    res.json({ data: users, count: users.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server_error', message: err.message });
  }
});


// Read single user
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: 'not_found' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server_error', message: err.message });
  }
});


// Update user
router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    updates.updatedAt = new Date();


    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ error: 'not_found' });


    await docRef.update(updates);
    const updated = await docRef.get();
    res.json({ id: updated.id, ...updated.data() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server_error', message: err.message });
  }
});


// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ error: 'not_found' });
    await docRef.delete();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server_error', message: err.message });
  }
});


module.exports = router;