package main

import (
	"context"
	"fmt"
	"os"
	"resume-maker/services/pdf"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)


type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}


func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}


func (a *App) GeneratePDF(htmlContent string, isLetter bool) error {

	filename, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title:           "Export Resume",
		DefaultFilename: "resume.pdf",
		Filters:         []runtime.FileFilter{{DisplayName: "PDF Files", Pattern: "*.pdf"}},
	})

	if err != nil || filename == "" {
		return nil 
	}


	pdfBytes, err := pdf.Generate(htmlContent, isLetter)
	if err != nil {
		return fmt.Errorf("backend generation error: %w", err)
	}


	if err := os.WriteFile(filename, pdfBytes, 0644); err != nil {
		return fmt.Errorf("failed to save file: %w", err)
	}

	return nil
}