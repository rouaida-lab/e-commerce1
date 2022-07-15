const { StatusCodes } = require('http-status-codes')
const { UnauthenticatedError,BadRequestError, NotFoundError } = require('../errors')
const Article = require('../models/Article')
const User = require('../models/User')
const Bascket = require('../models/Bascket')
const addArticle  = async (req, res) =>{
        const article = await Article.create(req.body)
        res.status(StatusCodes.CREATED).json( article )

}
const deleteArticle = async (req, res) =>{
    const { 
        params:{id}

    }=req 
    const article = await Article.findByIdAndDelete({_id:id})
    res.status(StatusCodes.CREATED).json({ msg:'article deleted succefuly' })

}
const updateArticle = async (req, res) =>{
    const { 
        params:{id}

    }=req 
    const article = await Article.findByIdAndUpdate({_id:id},req.body,
        { new: true, runValidators: true })
    res.status(StatusCodes.CREATED).json(article)

}
const addArticleToBascket = async (req, res) =>{
    const { 
        params:{id},
        user:{userId}

    }=req 
    const bascket = await Bascket.findOne({userId:userId})
    const article = await Article.findByIdAndUpdate({_id:id},{bascketId:bascket._id},
        { new: true, runValidators: true })
    res.status(StatusCodes.CREATED).json(bascket)

}
const deleteArticleFromBascket = async (req, res) =>{
    const { 
        params:{id},
        user:{userId}

    }=req 
    const article = await Article.findByIdAndUpdate({_id:id},{bascketId:null},
        { new: true, runValidators: true })
    res.status(StatusCodes.CREATED).json(bascket)

}

module.exports={
    addArticle,
    deleteArticle,
    updateArticle,
    deleteArticleFromBascket
}