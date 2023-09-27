
const imageMimeTypes = ['image/jpeg','image/png','image/ico']
const Artist = require('../models/Artist');

//Index Page
module.exports.index = async (req,res)=>{
    try{
        const artists = await Artist.find();
        res.render('admin/artists',{
            artists:artists,
            layout:'layouts/admin'
        })
    }
    catch(err){}
}

//New Artist page
module.exports.newArtist = async (req,res)=>{
    try{
        res.render('admin/artistsNew',{layout:'layouts/admin'})
    }
    catch(err){}
}

//Save Artist
module.exports.save = async (req,res)=>{
    try
    {
        const artistDetails = {
            artistname:req.body.name,
            fb:req.body.fb,
            tw:req.body.tw,
            ig:req.body.ig,
        }
        saveThumbnail(artistDetails,req.body.avatar)
        const newArtist = await Artist.create(artistDetails);
        if(newArtist)
        {
            res.render('admin/artistNew',{layout:'layouts/admin'})
        }
    }
    catch(err){
        res.send(err.message);
    }
}

// Saving an avatar in the DB
function saveThumbnail(artistDetails, encodedAvatar)
{
    if(encodedAvatar == null){return}

    const avatar = JSON.parse(encodedAvatar)
    if(avatar != null && imageMimeTypes.includes(avatar.type))
    {
        artistDetails.avatar = new Buffer.from(avatar.data, 'base64')
        artistDetails.avatarType = avatar.type
    }
}
