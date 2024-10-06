import Thought from "../models/thought.js";
import { Request, Response } from "express";

export const getThoughts = async (_req: Request, res: Response) => {

    try {
        
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        
        res.status(500).json(err);
    }
};

export const getSingleThought = async (req: Request, res: Response) => {

    try {
        
        const thought = await Thought.findById(req.params.thoughtId)
        
        if (!thought) {
            res.status(404).json({ message: 'No thought found with that id.' })
        } else {
            
            res.json(thought);
        }
    } catch (err) {
        
        res.status(500).json(err);
    }
};

export const createThought = async (req: Request, res: Response) => {

    try {
        
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateThought = async (req: Request, res: Response) => {

    try {
        
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought found with that id.' })
        } else {
            res.json(thought);
        }
    } catch (err) {
        
        res.status(500).json(err);
    }
};

export const deleteThought = async (req: Request, res: Response) => {

    try {
        
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId)

        if (!thought) {
            
            res.status(404).json({ message: 'No thought found with that id.' })
        } else {
            res.json(thought);
        }
    } catch (err) {
        
        res.status(500).json(err)
    }
};

export const addReaction = async (req: Request, res: Response) => {

    try {
        
        const { thoughtId, reactionId } = req.params;

        const thought = await Thought.findByIdAndUpdate(

            thoughtId,
            { $addToSet: { reactions: reactionId } },
            { new: true, runValidators: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought found with that id.' })
        } else {
            res.json(thought);
        }
    } catch (err) {
        
        res.status(500).json(err)
    }
};

export const deleteReaction = async (req: Request, res: Response) => {

    try {
        
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: req.params.reactionId } },
            { new: true, runValidators: true }
        );

        if (!thought) {
            
            res.status(404).json({ message: 'No thought found with that id.' })
        } else {
            res.json(thought)
        }
    } catch (err) {
        
        res.status(500).json(err)
    }
}