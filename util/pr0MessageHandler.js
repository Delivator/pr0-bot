const pr0gramm = require("./pr0gramm.js");
const { RichEmbed } = require('discord.js');

exports.run = (message) => {
  if (!message.channel.nsfw) return console.log("not a nsfw channel!");

  let msgSplit = message.content.split(" ");
  for (var i = 0; i < msgSplit.length; i++) {
    let postID = msgSplit[i].split("/")[msgSplit[i].split("/").length - 1];
    if (msgSplit[i].startsWith("http://pr0gramm.com/") || msgSplit[i].startsWith("https://pr0gramm.com/")) {
      pr0gramm.getPostInfo(postID, function(postInfo) {
        let text = `:thumbsup: **${postInfo.up}** :thumbsdown: **${postInfo.down}**\n`+
                   `:cucumber: **Benis:** ${postInfo.up - postInfo.down}\n`+
                   `:bust_in_silhouette: **Uploader:** [${postInfo.user}](http://pr0gramm.com/user/${postInfo.user})\n`+
                   `:hash: **Tags (${postInfo.tags.length})**: ${postInfo.topTags}\n`+
                   `:link: **Links:** `+
                   `[:page_facing_up: **Post-Url**](http://pr0gramm.com/new/${postInfo.id}) | [:frame_photo:️ **Media-URL**](${postInfo.mediaUrl})`;
        let imageLink = "";
        if (postInfo.full) {
            text += ` | [:mag: **Full-Link**](${postInfo.full})`;
            imageLink = postInfo.full;
        } else if (postInfo.fileType === "image") {
          imageLink = postInfo.mediaUrl;
        } else {
          imageLink = "";
        }
        const embed = new RichEmbed()
          .setAuthor(postInfo.user, "http://i.imgur.com/Rl5mnyG.png", "http://pr0gramm.com/user/" + postInfo.user)
          .setFooter("© pr0gramm.com")
          .setColor("#ee4d2e")
          .setDescription(text)
          .setImage(imageLink)
          .setThumbnail(postInfo.thumb)
          .setTimestamp(new Date(postInfo.created * 1000))
        message.channel.send({embed});
        // message.delete();
      });
    }
  }
};
