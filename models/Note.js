import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  imgUrl:{
    type:String,
    required:false
  },
  color: {
    type: String,
    default: 'bg-blue-100'
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  isArchived: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for better search performance
noteSchema.index({ title: 'text', content: 'text' });

const Note = mongoose.model('Note', noteSchema);
export default Note;
