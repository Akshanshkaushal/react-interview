import React from "react";

/* ---------------- Comments Data ---------------- */

const commentsData = [
  {
    id: 1,
    text: "This is first comment",
    replies: [
      {
        id: 2,
        text: "First reply",
        replies: [
          {
            id: 3,
            text: "Nested reply",
            replies: [
              {
                id: 3,
                text: "Nested reply",
                replies: [],
              },
            ],
          },
          {
            id: 4,
            text: "Nested reply",
            replies: [],
          },
          {
            id: 5,
            text: "Nested reply",
            replies: [],
          },
        ],
      },
    ],
  },

  {
    id: 4,
    text: "Second main comment",
    replies: [],
  },
];

/* ---------------- Comment Component ---------------- */

function Comment({ comment }) {
  return (
    <div style={commentStyle}>
      {/* Current Comment */}
      <p>{comment.text}</p>

      {/* Recursive Replies */}
      <div style={replyStyle}>
        {comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Main Component ---------------- */

function NestedComments() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Nested Comments UI</h1>

      {commentsData.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

/* ---------------- Styles ---------------- */

const commentStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "6px",
};

const replyStyle = {
  marginLeft: "30px",
  marginTop: "10px",
};

export default NestedComments;
